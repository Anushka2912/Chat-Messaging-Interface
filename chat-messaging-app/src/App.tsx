import React, { useState, useEffect } from 'react'
import './App.css'
import { Conversation, Message } from './types';
import ConversationList from './ConversationList';
import MessageDisplay from './MessageDisplay';
import MessageInput from './MessageInput';
import MessageService from './services/message.Service';

const App: React.FC = () => {
  
  // Current user ID (in a real app, this would come from authentication)
  const currentUserId = "user_123";
  
  //Mock conversation data
  const initialConversations: Conversation[] = [
    {id: 1, name: "Anushka", lastMessage: "Hey, how are you doing?"},
    {id: 2, name: "Ashish", lastMessage: "Have a good day!"},
    {id: 3, name: "Team Chat", lastMessage: "Alice: I finished the report"}
  ]

  //State Management
  const [conversations, setConversations] = useState<Conversation []>(initialConversations);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  // Load messages when active conversation changes
  useEffect(() => {
    if (activeConversation) {
      // In a real app, this would be an API call
      const mockMessages: Message[] = [
        {
          id: 1,
          text: "Hey there!",
          senderId: currentUserId,
          timestamp: Date.now() - 1000000
        },
        {
          id: 2,
          text: "Hi! How are you?",
          senderId: `other_user_${activeConversation.id}`,
          timestamp: Date.now() - 900000
        },
        {
          id: 3,
          text: "I'm doing well, thanks for asking!",
          senderId: currentUserId,
          timestamp: Date.now() - 800000
        }
      ];
      
      setMessages(mockMessages);
      
      // Simulate receiving messages periodically
      const intervalId = setInterval(() => {
        // 30% chance of receiving a message every 5 seconds
        if (Math.random() < 0.3) {
          const incomingMessage = MessageService.simulateIncomingMessage(activeConversation.id);
          
          setMessages(prevMessages => [...prevMessages, incomingMessage]);
          
          // Update conversation last message
          setConversations(prevConversations => 
            prevConversations.map(conv => 
              conv.id === activeConversation.id
                ? { ...conv, lastMessage: incomingMessage.text }
                : conv
            )
          );
        }
      }, 5000);
      
      // Clean up interval on component unmount or when conversation changes
      return () => clearInterval(intervalId);
    }
  }, [activeConversation, currentUserId]);

  // Handle sending a new message
  const handleSendMessage = (text: string): void => {
    if (!activeConversation) return;
    
    // Create new message
    const newMessage: Message = {
      id: Date.now(),
      text,
      senderId: currentUserId,
      timestamp: Date.now()
    };
    
    // Add to messages
    setMessages([...messages, newMessage]);
    
    // Update conversation's last message
    setConversations(
      conversations.map(conv => 
        conv.id === activeConversation.id
          ? { ...conv, lastMessage: text }
          : conv
      )
    );
  };
    
  return (
    <div className='app-container'>
      <div className='sidebar'>
        <h2>Conversations</h2>
        <ConversationList
          conversations={conversations}
          activeId={activeConversation?.id || null}
          onSelectConversation={setActiveConversation}
        />
      </div>
      <div className='chat-container'>
        {activeConversation ? (
          <div>
            <div className='chat-header'>
              <h2>{activeConversation.name}</h2>
            </div>
            <div className='messages-container'>
              <MessageDisplay
                messages={messages}
                currentUserId={currentUserId}
               />
            </div>
            <div className='message-input-container'>
              <MessageInput 
                onSendMessage={handleSendMessage}
              />
            </div>
          </div>
        ) : (
          <div className="no-conversation-selected">
            <p>Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
