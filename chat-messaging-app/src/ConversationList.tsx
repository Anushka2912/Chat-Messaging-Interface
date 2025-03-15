import React from "react";
import { Conversation } from "./types";

interface ConversationListProps {
    conversations: Conversation[],
    activeId: number | null,
    onSelectConversation: (conversation: Conversation) => void
}

const ConversationList: React.FC<ConversationListProps> = ({
        conversations,
        activeId,
        onSelectConversation
    }) => {
    return (
        <div className="conversation-list">
            {conversations.map(conversation => (
                <div
                    key={conversation.id}
                    className={`conversation-item ${activeId === conversation.id ? 'active' : ''}`}
                    onClick={() => onSelectConversation(conversation)}
                >
                    <div className="conversation-avatar">
                        {conversation.name.charAt(0)}
                    </div>
                    <div className="conversation-details">
                        <h3>{conversation.name}</h3>
                        <p>{conversation.lastMessage}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ConversationList;