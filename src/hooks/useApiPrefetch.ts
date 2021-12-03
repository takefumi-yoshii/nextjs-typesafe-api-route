import type { GetReqBody, GetReqQuery, GetResBody } from "@/types/pages/api";
import { getApiData } from "@/utils/fetcher";
import qs from "query-string";
import React from "react";
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
  ReqBody extends GetReqBody[T]
>(
  key: T,
  options: {
    revalidate?: number;
    query?: ReqQuery;
    requestInit?: Omit<RequestInit, "body"> & { body?: ReqBody };
  } = {}
): void {
  const r = options.revalidate ?? 1;
  if (r < 1) throw new Error("invalid revalidate value.");
  const url = options.query ? `${key}?${qs.stringify(options.query)}` : key;
  const now = Date.now();
  const timestamp = prefetchTimestamp.get(url);
  const shouldPrefetch = !timestamp ? true : timestamp - (now - r * 1000) < 0;
  if (!shouldPrefetch) return;
  prefetchTimestamp.set(url, now);
  mutate(url, () => getApiData(key, options));
}
// _____________________________________________________________________________
//
export function useApiPrefetch<
  T extends keyof GetResBody,
  ReqQuery extends GetReqQuery[T],
  ReqBody extends GetReqBody[T]
>(
  key: T,
  options: {
    revalidate?: number;
    query?: ReqQuery;
    requestInit?: Omit<RequestInit, "body"> & { body?: ReqBody };
  } = {}
) {
  const handleMouseEnter = React.useCallback(
    () => {
      const r = options.revalidate ?? 1;
      if (r < 1) throw new Error("invalid revalidate value.");
      prefetchApiData(key, options);
    },
    // eslint-disable-next-line
    []
  );
  React.useEffect(() => {
    prefetchApiData(key, options);
    // eslint-disable-next-line
  }, []);
  return handleMouseEnter;
}
