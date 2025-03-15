//Defines the structure of a conversation with an ID, name, and last message
export interface Conversation {
    id: number;
    name: string;
    lastMessage: string;
}

//Defines the structure of individual messages with ID, text content, sender ID, and timestamp
export interface Message {
    id: number;
    text: string;
    senderId: string;
    timestamp: number;
}