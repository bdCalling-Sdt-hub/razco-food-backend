import { SortOrder } from "mongoose";
import { IPaginationOptions } from "../types/pagination";

type ICalculatePaginationResponse = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
};

const calculatePagination = (
  options: IPaginationOptions
): ICalculatePaginationResponse => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);

  const skip = (page - 1) * limit;

  const sortBy = options.sortBy || "createdAt";
  const sortOrder = options.sortOrder || "desc";

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export const paginationHelpers = {
  calculatePagination,
};
