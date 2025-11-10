export interface BaseResponse<T> {
  statusCode: number;
  success?: boolean;
  message: string;
  data: T;
  error?: any;
}

export function createResponse<T>(
  statusCode: number,
  message: string,
  data: T,
  errors?: any,
): BaseResponse<T> {
  return {
    statusCode,
    success: statusCode >= 200 && statusCode < 300,
    message,
    data,
    error: errors,
  };
}
