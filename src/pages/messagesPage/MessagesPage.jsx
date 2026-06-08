// src/pages/messagesPage/MessagesPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { API_BASE_URL } from '../../config';
import './MessagesPage.css';

const MessagesPage = ({ user, sessionToken }) => {
  const [conversations, setConversations] = useState([]);
  const [activeConvo, setActiveConvo] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const stompClient = useRef(null);
  const messagesEndRef = useRef(null);

  const headers = { 'Authorization': `Bearer ${sessionToken}` };
  const isAdmin = user && (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN');

  useEffect(() => {
    if (!user) return;
    fetchInbox();
    connectWebSocket();
    return () => { if (stompClient.current) stompClient.current.deactivate(); };
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const connectWebSocket = () => {
    const wsUrl = API_BASE_URL.replace('https://', 'wss://').replace('http://', 'ws://');
    const client = new Client({
      webSocketFactory: () => new SockJS(`${API_BASE_URL}/ws`),
      connectHeaders: { Authorization: `Bearer ${sessionToken}` },
      onConnect: () => {
        setConnected(true);
        // Subscribe to personal message queue
        client.subscribe(`/user/${user.id}/queue/messages`, (msg) => {
          const newMsg = JSON.parse(msg.body);
          setMessages(prev => {
            // Only add if in current conversation
            if (activeConvo && (newMsg.senderId === activeConvo || newMsg.receiverId === activeConvo)) {
              return [...prev, newMsg];
            }
            return prev;
          });
          // Refresh inbox to update latest message
          fetchInbox();
        });
      },
      onDisconnect: () => setConnected(false),
      reconnectDelay: 5000,
    });
    client.activate();
    stompClient.current = client;
  };

  const fetchInbox = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/messages/inbox`, {
        headers: { ...headers, 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (data.success) setConversations(data.conversations);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const openConversation = async (otherUserId) => {
    setActiveConvo(otherUserId);
    try {
      const res = await fetch(`${API_BASE_URL}/api/messages/conversation/${otherUserId}`, {
        headers: { ...headers, 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (data.success) setMessages(data.messages);
    } catch (err) { console.error(err); }
  };

  const sendMessage = async () => {
    if (!inputText.trim() || !activeConvo) return;

    const msgData = {
      senderId: user.id,
      receiverId: activeConvo,
      content: inputText.trim(),
      carId: null
    };

    // Send via WebSocket
    if (stompClient.current && connected) {
      stompClient.current.publish({
        destination: '/app/chat.send',
        body: JSON.stringify(msgData)
      });
    } else {
      // Fallback to REST
      await fetch(`${API_BASE_URL}/api/messages/send`, {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ receiverId: activeConvo, content: inputText.trim() })
      });
    }

    // Optimistically add message to UI
    setMessages(prev => [...prev, {
      id: Date.now(),
      senderId: user.id,
      receiverId: activeConvo,
      content: inputText.trim(),
      createdAt: new Date().toISOString(),
      isRead: false
    }]);
    setInputText('');
    fetchInbox();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const activeConvoData = conversations.find(c => c.otherUserId === activeConvo);

  if (!user) {
    return (
      <div className="messages-page page">
        <div className="messages-empty">
          <h2>Please sign in to view messages</h2>
        </div>
      </div>
    );
  }

  // Admin: show all conversations. Customer: show conversation with admin (userId 2)
  const adminUserId = 2; // The admin user ID

  return (
    <div className="messages-page page">
      <div className="messages-layout">

        {/* ── SIDEBAR ── */}
        <div className="messages-sidebar">
          <div className="messages-sidebar-header">
            <h3>Messages</h3>
            <span className={`ws-status ${connected ? 'connected' : 'disconnected'}`}>
              {connected ? '● Live' : '○ Offline'}
            </span>
          </div>

          {loading ? (
            <div className="sidebar-loading">Loading...</div>
          ) : isAdmin ? (
            // Admin sees all conversations
            conversations.length === 0 ? (
              <div className="sidebar-empty">No conversations yet</div>
            ) : (
              conversations.map(c => (
                <div
                  key={c.otherUserId}
                  className={`convo-item ${activeConvo === c.otherUserId ? 'active' : ''}`}
                  onClick={() => openConversation(c.otherUserId)}
                >
                  <div className="convo-avatar">{c.otherUsername?.[0]?.toUpperCase()}</div>
                  <div className="convo-info">
                    <strong>{c.otherUsername}</strong>
                    <span>{c.latestMessage}</span>
                  </div>
                  {c.unreadCount > 0 && (
                    <span className="unread-badge">{c.unreadCount}</span>
                  )}
                </div>
              ))
            )
          ) : (
            // Customer sees only admin conversation
            <div
              className={`convo-item ${activeConvo === adminUserId ? 'active' : ''}`}
              onClick={() => openConversation(adminUserId)}
            >
              <div className="convo-avatar">A</div>
              <div className="convo-info">
                <strong>Bhavishya Support</strong>
                <span>Chat with our team</span>
              </div>
            </div>
          )}

          {/* Customer: button to start chat with admin */}
          {!isAdmin && conversations.length === 0 && (
            <button className="start-chat-btn" onClick={() => openConversation(adminUserId)}>
              💬 Chat with Support
            </button>
          )}
        </div>

        {/* ── CHAT AREA ── */}
        <div className="messages-chat">
          {!activeConvo ? (
            <div className="chat-empty">
              <span>💬</span>
              <h3>Select a conversation</h3>
              <p>{isAdmin ? 'Choose a customer to reply to' : 'Click "Chat with Support" to start'}</p>
            </div>
          ) : (
            <>
              <div className="chat-header">
                <div className="convo-avatar">{activeConvoData?.otherUsername?.[0]?.toUpperCase() || 'A'}</div>
                <div>
                  <strong>{activeConvoData?.otherUsername || 'Bhavishya Support'}</strong>
                  <span>{connected ? 'Online' : 'Offline'}</span>
                </div>
              </div>

              <div className="chat-messages">
                {messages.length === 0 && (
                  <div className="chat-start">Start the conversation below 👇</div>
                )}
                {messages.map((msg, i) => (
                  <div key={msg.id || i} className={`chat-bubble-wrap ${msg.senderId === user.id ? 'mine' : 'theirs'}`}>
                    <div className="chat-bubble">
                      {msg.content}
                      <span className="chat-time">
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="chat-input-area">
                <textarea
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message... (Enter to send)"
                  rows={2}
                />
                <button onClick={sendMessage} disabled={!inputText.trim()} className="send-btn">
                  Send →
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;