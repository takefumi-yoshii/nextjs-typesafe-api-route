import type { GetReqBody, GetReqQuery, GetResBody } from "@/types/pages/api";
import { getApiData } from "@/utils/fetcher";
import { mapPathParamFromQuery } from "@/utils/mapPathParamFromQuery";
import { mutate } from "swr";
// _____________________________________________________________________________
//
const defaultRevalidate = 24 * 60 * 60;
const prefetchTimestamp = new Map<string, number>();
export function clearPrefetchTimestamp() {
  prefetchTimestamp.clear();
}
// _____________________________________________________________________________
//
export function prefetchApiData<
  ApiPath extends keyof GetResBody,
  ReqQuery extends GetReqQuery[ApiPath],
  ResBody extends GetResBody[ApiPath],
  ReqBody extends GetReqBody[ApiPath]
>({
  path,
  revalidate,
  query,
  requestInit,
}: {
  path: ApiPath;
  revalidate?: number;
  query?: ReqQuery;
  requestInit?: Omit<RequestInit, "body"> & { body?: ReqBody };
}): Promise<ResBody | void> {
  const r = revalidate ?? defaultRevalidate;
  if (r < 1) throw new Error("invalid revalidate value.");
  const url = mapPathParamFromQuery(path, query);
  const now = Date.now();
  const timestamp = prefetchTimestamp.get(url);
  const shouldPrefetch = !timestamp ? true : timestamp - (now - r * 1000) < 0;
  if (!shouldPrefetch) return Promise.resolve();
  prefetchTimestamp.set(url, now);
  return mutate(url, () => getApiData(path, { query, requestInit }), false);
}
