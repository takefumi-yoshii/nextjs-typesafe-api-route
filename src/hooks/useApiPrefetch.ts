import type { Pages } from "@/types/pages";
import type { GetReqBody, GetReqQuery, GetResBody } from "@/types/pages/api";
import { prefetchApiData } from "@/utils/swr";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useInView } from "react-intersection-observer";
// _____________________________________________________________________________
//
export function useApiPrefetch<
  PagePath extends keyof Pages,
  ApiPath extends keyof GetResBody,
  ReqQuery extends GetReqQuery[ApiPath],
  ReqBody extends GetReqBody[ApiPath]
>(
  path: ApiPath,
  options: {
    revalidate?: number;
    query?: ReqQuery;
    requestInit?: Omit<RequestInit, "body"> & { body?: ReqBody };
    ignoreRoute?: PagePath;
  } = {}
) {
  const { pathname } = useRouter();
  const { ref, inView } = useInView({
    rootMargin: "200px",
  });
  const prefetch = React.useCallback(
    () => prefetchApiData(path, options),
    // eslint-disable-next-line
    []
  );
  React.useEffect(() => {
    if (!inView || options.ignoreRoute === pathname) return;
    prefetchApiData(path, options);
    // eslint-disable-next-line
  }, [inView, pathname]);
  return [prefetch, ref] as const;
}
