class EmptyFields extends Error {
  constructor() {
    super("Author and message are required");
    this.name = "EmptyFields";
    this.statusCode = 400;
  }
}

export default EmptyFields;
