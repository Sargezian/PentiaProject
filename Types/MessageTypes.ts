export type Message = {
    name: string;
    text: string;
    date: number;
};

export type MessageListProps = {
    messages: Message[];
    formatDate: (timestamp: number) => string;
};
