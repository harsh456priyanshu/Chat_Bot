import { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import RobotMascot from "./components/RobotMascot";
import MiniRobot from "./components/MiniRobot";
import Send from "./components/Send";
import User from "./components/user";
import './App.css';
import MicButton from "./components/MicButton";

export default function App() {
  const [query, setQuery] = useState(localStorage.getItem('lastQuery') || '');
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [placeholder, setPlaceholder] = useState("");

  const fullText = "Ask Anything...";
  const speed = 100;
  const deleteSpeed = 50;
  const delay = 1000;

  useEffect(() => {
    let index = 0;
    let deleting = false;

    const interval = setInterval(() => {
      if (!deleting) {
        setPlaceholder(fullText.slice(0, index + 1));
        index++;
        if (index === fullText.length) {
          deleting = true;
          setTimeout(() => {}, delay);
        }
      } else {
        setPlaceholder(fullText.slice(0, index - 1));
        index--;
        if (index === 0) {
          deleting = false;
        }
      }
    }, deleting ? deleteSpeed : speed);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      timestamp: new Date().toLocaleTimeString(),
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    socket.emit('ai-message', inputText);
    setInputText('');
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    let socketInstance = io("https://chat-bot-2q74.onrender.com");
    setSocket(socketInstance);

    socketInstance.on('ai-message-response', (response) => {
      const botMessage = {
        id: Date.now() + 1,
        text: response,
        timestamp: new Date().toLocaleTimeString(),
        sender: 'bot'
      };
      setMessages(prev => [...prev, botMessage]);
    });
  }, []);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>Food Assistance</h1>
      </div>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="no-messages">
            <RobotMascot />
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`message-row ${message.sender === 'user' ? 'user-row' : 'bot-row'}`}
            >
              {message.sender === 'bot' && (
                <div className="avatar">
                  <MiniRobot />
                </div>
              )}

              <div className={`message-bubble ${message.sender}`}>
                <span>{message.text}</span>
                <div className="timestamp">{message.timestamp}</div>
              </div>

              {message.sender === 'user' && (
                <div className="avatar">
                  <User />
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder={placeholder}
          className="input-field"
        />
        <button
          onClick={handleSendMessage}
          className="send-button"
          disabled={inputText.trim() === ''}
        >
          <Send />
        </button>

        {/* <MicButton
          onVoice={(voiceText) => {
            setQuery(voiceText);
            handleSearch(voiceText);
          }}
        /> */}
      </div>
    </div>
  );
}
