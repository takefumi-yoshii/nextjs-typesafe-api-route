import { useApiPrefetch } from "@/hooks/useApiPrefetch";
import type { GetReqBody, GetReqQuery, GetResBody } from "@/types/pages/api";
import Link from "next/link";
import React from "react";
// _____________________________________________________________________________
//
export function LinkWithApiPrefetch<
  T extends keyof GetResBody,
  ReqQuery extends GetReqQuery[T],
  ReqBody extends GetReqBody[T]
>({
  linkProps,
  apiPrefetch: { path, revalidate, query, requestInit },
  children,
}: {
  linkProps: React.ComponentPropsWithoutRef<typeof Link>;
  apiPrefetch: {
    path: T;
    revalidate?: number;
    query?: ReqQuery;
    requestInit?: Omit<RequestInit, "body"> & { body?: ReqBody };
  };
  children?: React.ReactNode;
}) {
  const [prefetch, ref] = useApiPrefetch(path, {
    revalidate,
    query,
    requestInit,
  });
  return (
    <Link {...linkProps}>
      <a onMouseEnter={prefetch} ref={ref}>
        {children}
      </a>
    </Link>
  );
}