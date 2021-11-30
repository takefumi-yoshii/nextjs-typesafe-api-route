import type { Error } from "@/types/api";
import type { GetReqQuery, GetResBody } from "@/types/pages/api";
import queryString from "query-string";
import useSWR from "swr";
// _____________________________________________________________________________
//
export function useApiData<
  T extends keyof GetResBody,
  Q extends GetReqQuery[T],
  U extends GetResBody[T]
>(key: T, query?: Q, init?: RequestInit) {
  const qs = queryString.stringify(query as {});
  const url = qs ? `${key}?${qs}` : key;
  return useSWR<U, Error["error"]>(url, async (): Promise<U> => {
    return await fetch(url, init).then(async (res) => {
      const { data, error } = await res.json();
      if (error) throw error;
      return data;
    });
  });
}
