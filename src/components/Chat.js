import React, { useState } from 'react';
import axios from 'axios';
import './Chat.css';

const Chat = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSend = async () => {
        try {
            const response = await axios.post('https://chatbox-backend-b6sc.onrender.com/query', { text: input });
            setMessages([...messages, { text: input, user: true }, { text: response.data.answer, user: false }]);
            setInput('');
        } catch (error) {
            console.error("Error sending message", error);
            setMessages([...messages, { text: "Network Error", user: false }]);
        }
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <i className="fas fa-cloud"></i>
                <h1>Cloud Migration Chatbox</h1>
            </header>
            <main className="chat-container">
                <div className="example-questions">
                    <h3>Example Questions:</h3>
                    <ul>
                        <li>What is cloud migration?</li>
                        <li>How does cloud migration work?</li>
                        <li>What are the benefits of cloud migration?</li>
                        <li>What challenges can arise during cloud migration?</li>
                        <li>What is a cloud migration strategy?</li>
                        {/* <li>How are you?</li>
                        <li>Hello</li> */}
                    </ul>
                </div>
                <div className="messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.user ? 'user' : 'bot'}`}>
                            {msg.text}
                        </div>
                    ))}
                </div>
                <div className="input-container">
                    <input 
                        type="text" 
                        value={input} 
                        placeholder="Ask me about cloud migration..." 
                        onChange={(e) => setInput(e.target.value)} 
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button onClick={handleSend}><i className="fas fa-paper-plane"></i> Send</button>
                </div>
            </main>
            <footer className="app-footer">
                <i className="fas fa-cloud"></i>
                <p>&copy; 2024 Cloud Migration Chatbox. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Chat;
