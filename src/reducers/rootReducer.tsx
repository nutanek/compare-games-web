export type RootReducerState = {
    isOpenChatModal: boolean;
};

export const initialState: RootReducerState = {
    isOpenChatModal: false,
};

export function rootReducer(
    state: RootReducerState = initialState,
    action: { type: string }
) {
    switch (action.type) {
        case "OPEN_CHAT_MODAL":
            return { ...state, isOpenChatModal: true };
        case "CLOSE_CHAT_MODAL":
            return { ...state, isOpenChatModal: false };
        default:
            return state;
    }
}
