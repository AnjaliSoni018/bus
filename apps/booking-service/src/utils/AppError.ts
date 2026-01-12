export class AppError extends Error {
  public statusCode: number;
  public payload?: any;
  constructor(message: string, statusCode = 500, payload?: any) {
    super(message);
    this.statusCode = statusCode;
    this.payload = payload;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
