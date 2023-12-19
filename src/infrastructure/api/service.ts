import { ABodyParams, TResponse } from "@domain/api.dto";
import { BOption, TOption } from "@domain/options.dto";

import client from "./client";
import endpoint from "./endpoint";

const getOptions = async ({
  page = 1,
  limit = 10,
  query,
}: ABodyParams): TResponse<TOption[]> => {
  const result = await client.get<BOption[]>(endpoint.options, {
    params: {
      _page: page,
      _limit: limit,
      q: query,
    },
  });
  return result.data.map(({ id, label }) => ({ value: id, label }));
};

const service = { getOptions };

export default service;
