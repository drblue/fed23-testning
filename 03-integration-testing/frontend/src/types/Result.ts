export type Result<T = void> = ResultSuccess<T> | ResultError;

export type ResultSuccess<T> = {
	success: true;
	data: T;
};

export type ResultError = {
	success: false;
	error: string;
};
