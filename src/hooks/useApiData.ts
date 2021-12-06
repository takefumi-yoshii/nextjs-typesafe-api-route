import type { Error, GetReqQuery, GetResBody } from "@/types/pages/api";
import { mapPathParamFromQuery } from "@/utils/mapPathParamFromQuery";
import useSWR, { SWRConfiguration } from "swr";
// _____________________________________________________________________________
//
export function useApiData<
  T extends keyof GetResBody,
  ReqQuery extends GetReqQuery[T],
  ResBody extends GetResBody[T]
>(
  path: T,
  {
    query,
    requestInit,
    swrConfig,
  }: {
    query?: ReqQuery;
    requestInit?: RequestInit;
    swrConfig?: SWRConfiguration;
  } = {}
) {
  const url = mapPathParamFromQuery(path, query);
  return useSWR<ResBody, Error["error"]>(
    url,
    async (): Promise<ResBody> => {
      const { data, error } = await fetch(url, requestInit).then((res) =>
        res.json()
      );
      if (error) throw error;
      return data;
    },
    swrConfig
  );
}
