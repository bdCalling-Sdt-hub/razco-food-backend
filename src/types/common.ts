export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    totalPage: number;
    total: number;
  };
  data: T | null;
};
