class MessageRepository {
  async create() {}

  async findByConversationId(
    conversationId: string
  ) {}
}

export const messageRepository =
  new MessageRepository();