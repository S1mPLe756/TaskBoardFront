export class ValidationError extends Error {
  constructor(errors, message = 'Validation failed') {
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;
    this.status = 422;
  }
}