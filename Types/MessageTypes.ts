export type Message = {
    name: string;
    text: string;
    date: number;
    imageUrl?: string;
};

export type MessageListProps = {
    messages: Message[];
    formatDate: (timestamp: number) => string;
};
