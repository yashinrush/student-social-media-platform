import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { FaPaperPlane } from 'react-icons/fa';

const socket = io.connect('http://localhost:5000');

function Chat() {
    const { user } = useSelector((state) => state.auth);
    const [room, setRoom] = useState('');
    const [currentMessage, setCurrentMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [showChat, setShowChat] = useState(false);

    const joinRoom = () => {
        if (room !== '') {
            socket.emit('join_room', room);
            setShowChat(true);
        }
    };

    const sendMessage = async () => {
        if (currentMessage !== '') {
            const messageData = {
                room: room,
                author: user ? user.name : 'Anonymous',
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ':' +
                    new Date(Date.now()).getMinutes(),
            };

            await socket.emit('send_message', messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage('');
        }
    };

    useEffect(() => {
        socket.off("receive_message").on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-950 p-4 transition-colors duration-300">
            {!showChat ? (
                <div className="bg-white dark:bg-slate-900 p-8 rounded-lg shadow-md w-full max-w-md text-center border border-transparent dark:border-slate-800">
                    <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Join A Chat</h3>
                    <input
                        type="text"
                        placeholder="Room ID..."
                        className="w-full px-4 py-2 border dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400"
                        onChange={(event) => {
                            setRoom(event.target.value);
                        }}
                    />
                    <button
                        onClick={joinRoom}
                        className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition shadow-lg shadow-blue-500/30"
                    >
                        Join Room
                    </button>
                </div>
            ) : (
                <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg w-full max-w-lg overflow-hidden flex flex-col h-[600px] border border-gray-200 dark:border-slate-800">
                    <div className="bg-blue-600 p-4 text-white font-bold flex justify-between items-center shadow-md z-10">
                        <span>Live Chat: {room}</span>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-slate-950 flex flex-col gap-3">
                        {messageList.map((messageContent, index) => {
                            const isMyMessage = user && messageContent.author === user.name;
                            return (
                                <div
                                    key={index}
                                    className={`max-w-[75%] p-3 rounded-2xl shadow-sm ${isMyMessage
                                        ? 'bg-blue-600 text-white self-end rounded-br-none'
                                        : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 self-start rounded-bl-none border border-gray-100 dark:border-slate-700'
                                        }`}
                                >
                                    <div className="flex flex-col">
                                        <p className="text-sm leading-relaxed">{messageContent.message}</p>
                                        <div className={`text-[10px] flex gap-2 mt-1 opacity-70 ${isMyMessage ? 'justify-end text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                                            <span>{messageContent.time}</span>
                                            <span className="font-bold">{messageContent.author}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-900 border-t dark:border-slate-800 flex gap-2">
                        <input
                            type="text"
                            value={currentMessage}
                            placeholder="Type a message..."
                            className="flex-1 border dark:border-slate-700 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400"
                            onChange={(event) => {
                                setCurrentMessage(event.target.value);
                            }}
                            onKeyPress={(event) => {
                                event.key === 'Enter' && sendMessage();
                            }}
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition shadow-md hover:shadow-lg transform active:scale-95"
                        >
                            <FaPaperPlane />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Chat;
