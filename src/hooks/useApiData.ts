import type { Error, GetReqQuery, GetResBody } from "@/types/pages/api";
import queryString from "query-string";
import useSWR, { SWRConfiguration } from "swr";
// _____________________________________________________________________________
//
export function useApiData<
  T extends keyof GetResBody,
  ReqQuery extends GetReqQuery[T],
  ResBody extends GetResBody[T]
>(
  key: T,
  options: {
    query?: ReqQuery;
    requestInit?: RequestInit;
    swrConfig?: SWRConfiguration;
  } = {}
) {
  const qs = queryString.stringify(options.query as {});
  const url = qs ? `${key}?${qs}` : key;
  return useSWR<ResBody, Error["error"]>(
    url,
    async (): Promise<ResBody> => {
      return await fetch(url, options.requestInit).then(async (res) => {
        const { data, error } = await res.json();
        if (error) throw error;
        return data;
      });
    },
    options.swrConfig
  );
}
