type ABodyParams = {
  page?: number;
  limit?: number;
  query?: string;
};

type TResponse<T> = Promise<T>;

export type { ABodyParams, TResponse };
