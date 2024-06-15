import type { HttpResponseInterface } from '../interface/httpResponse.interface';

function HttpResponse<T>(statusCode: number, message: string, data?: T | T[]): HttpResponseInterface<T> {
	return {
		statusCode,
		message,
		data,
	};
}

export default HttpResponse;
