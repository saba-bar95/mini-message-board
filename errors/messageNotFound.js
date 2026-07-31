class MessageNotFound extends Error {
  constructor(id) {
    super(`Message not found with id ${id}`);
    this.name = "MessageNotFound";
    this.statusCode = 404;
    this.id = id;
  }
}

export default MessageNotFound;
