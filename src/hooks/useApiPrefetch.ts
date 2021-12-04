import type { GetReqBody, GetReqQuery, GetResBody } from "@/types/pages/api";
import { prefetchApiData } from "@/utils/swr";
import { useIntersection } from "next/dist/client/use-intersection";
import React from "react";
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
  const [setIntersectionRef, isVisible] = useIntersection({
    rootMargin: "200px",
  });
  const prefetch = React.useCallback(
    () => prefetchApiData(key, options),
    // eslint-disable-next-line
    []
  );
  React.useEffect(() => {
    if (!isVisible) return;
    prefetchApiData(key, options);
    // eslint-disable-next-line
  }, [isVisible]);
  return [prefetch, setIntersectionRef] as const;
}
