import { Link, LinkProps } from "@/components/Link";
import { useApiPrefetch } from "@/hooks/useApiPrefetch";
import type { Pages } from "@/types/pages";
import type { GetReqBody, GetReqQuery, GetResBody } from "@/types/pages/api";
import React from "react";
// _____________________________________________________________________________
//
export function LinkWithApiPrefetch<
  PagePath extends keyof Pages,
  PageQuery extends Pages[PagePath],
  ApiPath extends keyof GetResBody,
  ReqQuery extends GetReqQuery[ApiPath],
  ReqBody extends GetReqBody[ApiPath]
>({
  linkProps,
  apiPrefetch: { path: apiPrefetchPath, ...apiPrefetchOptions },
  children,
}: {
  linkProps: LinkProps<PagePath, PageQuery>;
  apiPrefetch: {
    path: ApiPath;
    revalidate?: number;
    query?: ReqQuery;
    requestInit?: Omit<RequestInit, "body"> & { body?: ReqBody };
    ignoreRoute?: PagePath;
  };
  children?: React.ReactNode;
}) {
  const [prefetch, setIntersectionRef] = useApiPrefetch(
    apiPrefetchPath,
    apiPrefetchOptions
  );
  return (
    <Link {...linkProps}>
      <a onMouseEnter={prefetch} ref={setIntersectionRef}>
        {children}
      </a>
    </Link>
  );
}
