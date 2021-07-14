export interface ApiErrorResponse {
  statusCode: number;
  message: string[] | string | object | null;
  error?: string;
}
