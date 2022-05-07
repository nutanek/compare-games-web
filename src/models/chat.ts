export type ChatRoom = {
    id: number;
    name: string;
    image: string;
    game_id: number;
};

export type AllChatRooms = {
    rooms: ChatRoom[];
    page: number;
    total: number;
};
