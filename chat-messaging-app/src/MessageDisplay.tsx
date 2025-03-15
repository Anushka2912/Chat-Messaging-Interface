import React from "react";
import { Message } from "./types";

interface MessageDisplayProps {
    messages: Message[];
    currentUserId: string;
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({messages, currentUserId}) => {
    return (
        <div className="messages-list">
            {messages.length === 0 ? (
                <p className="no-messages">No Messages Yet</p>
            ) : (
                    messages.map(message => (
                        <div
                            key={message.id}
                            className={`message ${message.senderId === currentUserId ? 'sent' : 'received'}`}
                        >
                            <div className="message-content">{message.text}</div>
                            <div className="message-time">
                                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    );
};

export default MessageDisplay;