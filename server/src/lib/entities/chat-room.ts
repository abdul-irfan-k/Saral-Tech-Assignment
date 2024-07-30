interface chatRoomConversationsInterface {
  messageId: string;
  messageType: string;
}
export interface chatRoomEntity {
  _id?: string;
  UserIds: string[];
  chatRoomConversations: chatRoomConversationsInterface;
}
