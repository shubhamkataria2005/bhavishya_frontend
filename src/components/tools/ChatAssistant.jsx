// src/components/tools/ChatAssistant.jsx
import React, { useState, useRef, useEffect } from 'react';
import './Tools.css';
import { API_BASE_URL } from '../../config';

const ChatAssistant = ({ user }) => {
  const [messages, setMessages] = useState([
    { text: `Namaste! 🙏 I'm your Bhavishya Oil assistant. Ask me anything about our pure Kachi Ghani Mustard Oil, prices, health benefits or how to become a distributor!`, sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const quickQuestions = [
    'What sizes are available?',
    'What is the price of 1 litre oil?',
    'Is it good for heart health?',
    'How to become a distributor?',
  ];

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage = { text: inputText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/ai-assistant/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputText })
      });

      const data = await response.json();

      if (data.success) {
        setMessages(prev => [...prev, { text: data.response, sender: 'bot' }]);
      } else {
        setMessages(prev => [...prev, { text: "Sorry, I'm having trouble. Please call us at +91-9653550600.", sender: 'bot' }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { text: "Network error. Please try again or call +91-9653550600.", sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="tool-panel">
      <div className="tool-header">
        <h2>🫒 Bhavishya Oil Assistant</h2>
        <p>Ask anything about our products, health benefits, pricing or distribution. Powered by AI.</p>
      </div>

      <div className="quick-chips">
        {quickQuestions.map((q, i) => (
          <button key={i} className="quick-chip" onClick={() => setInputText(q)}>{q}</button>
        ))}
      </div>

      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-msg ${msg.sender}`}>
            <div className="chat-bubble">{msg.text}</div>
          </div>
        ))}
        {isLoading && (
          <div className="chat-msg bot">
            <div className="chat-bubble loading">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-row">
        <textarea
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about products, prices, health benefits..."
          rows={2}
          disabled={isLoading}
        />
        <button onClick={handleSend} disabled={isLoading || !inputText.trim()} className="send-btn">
          {isLoading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatAssistant;