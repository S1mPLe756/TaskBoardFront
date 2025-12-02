import {HttpError} from "../errors/httpError";
import {NetworkError} from "../errors/networkError";
import {ValidationError} from "../errors/validationError";

export const handleHttpError = (error) => {
  if (error instanceof HttpError ||
      error instanceof NetworkError ||
      error instanceof ValidationError) {
    return error;
  }

  if (error.response) {
    const { status, data } = error.response;

    switch (status) {
      case 400:
        return new HttpError(400, data?.message || 'Bad request', data);
      case 401:
        return new HttpError(401, data?.message || 'Unauthorized', data);
      case 403:
        return new HttpError(403, data?.message || 'Forbidden', data);
      case 404:
        return new HttpError(404, data?.message || 'Resource not found', data);
      case 422:
        return new ValidationError(data?.errors, data?.message || 'Validation failed');
      case 429:
        return new HttpError(429, data?.message || 'Too many requests', data);
      case 500:
        return new HttpError(500, data?.message || 'Internal server error', data);
      default:
        return new HttpError(status, data?.message || `HTTP Error ${status}`, data);
    }
  } else if (error.request) {
    return new NetworkError('No response from server. Check your connection.');
  } else {
    return new HttpError(-1, error.message || 'Request configuration error');
  }
};

export const logError = (error, context = '') => {
  const errorInfo = {
    context,
    name: error.name,
    message: error.message,
    status: error.status,
    data: error.data,
    timestamp: new Date().toISOString(),
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
  };

  console.error('API Error:', errorInfo);

  // sendErrorToMonitoring(errorInfo);

  return errorInfo;
};

export const getUserFriendlyMessage = (error) => {
  if (error instanceof NetworkError) {
    return 'Нет соединения с сервером. Проверьте подключение к интернету.';
  }

  if (error instanceof ValidationError) {
    return 'Проверьте правильность введенных данных.';
  }

  const messages = {
    400: 'Неверный запрос. Проверьте данные.',
    401: 'Требуется авторизация.',
    403: 'Доступ запрещен.',
    404: 'Ресурс не найден.',
    429: 'Слишком много запросов. Попробуйте позже.',
    500: 'Ошибка сервера. Попробуйте позже.',
    502: 'Сервер временно недоступен.',
    503: 'Сервис временно недоступен.',
  };

  return messages[error.status] ||
      error.message ||
      'Произошла ошибка. Попробуйте еще раз.';
};