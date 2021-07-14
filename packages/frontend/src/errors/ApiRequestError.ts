export class ApiRequestError extends Error {
  constructor(
    public statusCode: number,
    public apiMessage: any,
    public error: string | null = null
  ) {
    super();

    this.name = 'ApiRequestError';
    this.message = `API request error: ${statusCode} - ${statusCode !== 400 ? apiMessage : error}`;

    this.statusCode = statusCode;
    this.apiMessage = apiMessage;
    this.error = error;
  }
}
