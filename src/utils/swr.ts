import type { GetReqBody, GetReqQuery, GetResBody } from "@/types/pages/api";
import { getApiData } from "@/utils/fetcher";
import qs from "query-string";
import { mutate } from "swr";
// _____________________________________________________________________________
//
const prefetchTimestamp = new Map<string, number>();
export function clearPrefetchTimestamp() {
  prefetchTimestamp.clear();
}
// _____________________________________________________________________________
//
export function prefetchApiData<
  T extends keyof GetResBody,
  ReqQuery extends GetReqQuery[T],
  ResBody extends GetResBody[T],
  ReqBody extends GetReqBody[T]
>(
  key: T,
  options: {
    revalidate?: number;
    query?: ReqQuery;
    requestInit?: Omit<RequestInit, "body"> & { body?: ReqBody };
  } = {}
): Promise<ResBody | void> {
  const r = options.revalidate ?? 1;
  if (r < 1) throw new Error("invalid revalidate value.");
  const url = options.query ? `${key}?${qs.stringify(options.query)}` : key;
  const now = Date.now();
  const timestamp = prefetchTimestamp.get(url);
  const shouldPrefetch = !timestamp ? true : timestamp - (now - r * 1000) < 0;
  if (!shouldPrefetch) return Promise.resolve();
  prefetchTimestamp.set(url, now);
  return mutate(url, () => getApiData(key, options));
}
