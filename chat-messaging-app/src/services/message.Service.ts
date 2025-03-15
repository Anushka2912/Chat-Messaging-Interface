import { Message } from '../types';

interface MessageServiceType {
  simulateIncomingMessage: (activeConversationId: number) => Message;
}

const MessageService: MessageServiceType = {
  // Simulate receiving a message
  simulateIncomingMessage(activeConversationId: number): Message {
    const responses: string[] = [
      "Hey there!",
      "How's it going?",
      "That's interesting.",
      "I'll get back to you soon.",
      "Thanks for the update!"
    ];
    
    const randomResponse: string = responses[Math.floor(Math.random() * responses.length)];
    
    return {
      id: Date.now(),
      text: randomResponse,
      senderId: `other_user_${activeConversationId}`,
      timestamp: Date.now()
    };
  }
};

export default MessageService;