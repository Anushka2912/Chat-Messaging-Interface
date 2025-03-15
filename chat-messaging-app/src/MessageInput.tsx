import React, { FormEvent, useState } from "react";

interface MessageInputProps {
    onSendMessage: (text: string) => void;
    disabled?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({onSendMessage, disabled = false}) => {
    const [message, setMessage] = useState<string>('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <div>
            <form className="message-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="message-input"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={disabled}
                />
                <button
                    type="submit"
                    className="send-button"
                    disabled={disabled || !message.trim()}
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default MessageInput;