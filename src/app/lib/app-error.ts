export class AppError extends Error {
  constructor(message: string, public code: string, public detail?: any) {
    super(message);
  }
}