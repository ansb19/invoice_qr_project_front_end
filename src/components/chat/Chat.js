import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Chat.css';  // CSS 파일 임포트

const socket = io(process.env.REACT_APP_BACK_END_URL, { withCredentials: true });

function Chat() {
    const [messages, setMessages] = useState([]); // 채팅 메시지 상태
    const [inputMessage, setInputMessage] = useState(''); // 입력한 메시지 상태
    const [currentUser, setCurrentUser] = useState(''); // 현재 사용자의 이름 또는 ID

    // 메시지 가져오기 (API로부터)
    const fetchCurrentUser = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACK_END_URL}/chat/me`, { withCredentials: true });
            setCurrentUser(response.data.username);  // 서버에서 현재 사용자의 이름을 받음
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    // 컴포넌트 마운트 시 사용자 정보 가져오기 및 소켓 이벤트 리스너 설정
    useEffect(() => {
        fetchCurrentUser();

        // 소켓 이벤트 리스너 설정
        socket.on('chat message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off('chat message');
        };
    }, []);

    // 메시지 입력 핸들러
    const handleMessageChange = (e) => {
        setInputMessage(e.target.value);
    };

    // 메시지 전송 핸들러
    const handleSendMessage = (e) => {
        e.preventDefault();

        if (inputMessage.trim() === '') return;

        const message = {
            message: inputMessage,
            user: currentUser  // 메시지 발신자 정보 포함
        };

        socket.emit('chat message', message);  // 서버에 메시지 전송
        setInputMessage('');  // 입력창 비우기
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h2>Chat Room</h2>
            </div>
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div 
                        key={index} 
                        className={`chat-message ${msg.user === currentUser ? 'outgoing' : 'incoming'}`}>
                        <div className="chat-bubble">
                            <strong>{msg.user}</strong>: {msg.message}
                        </div>
                    </div>
                ))}
            </div>
            <form className="chat-input-container" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={inputMessage}
                    onChange={handleMessageChange}
                    placeholder="Type a message..."
                    className="chat-input"
                    required
                />
                <button type="submit" className="chat-send-button">Send</button>
            </form>
        </div>
    );
}

export default Chat;
