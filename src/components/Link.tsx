import { useApiPrefetch } from "@/hooks/useApiPrefetch";
import type { Pages } from "@/types/pages";
import type { GetReqBody, GetReqQuery, GetResBody } from "@/types/pages/api";
import { mapPathParamFromQuery } from "@/utils/mapPathParamFromQuery";
import NextLink from "next/link";
import React from "react";
// _____________________________________________________________________________
//
type LinkBase = Omit<React.ComponentPropsWithoutRef<typeof NextLink>, "href">;
type Prefetch<ApiPath, ReqQuery, ReqBody, PagePath> = {
  path: ApiPath;
  revalidate?: number;
  query?: ReqQuery;
  requestInit?: Omit<RequestInit, "body"> & { body?: ReqBody };
  ignoreRoute?: PagePath;
};
// _____________________________________________________________________________
//
function Prefetch<
  PagePath extends keyof Pages,
  ApiPath extends keyof GetResBody,
  ReqQuery extends GetReqQuery[ApiPath],
  ReqBody extends GetReqBody[ApiPath]
>({
  children,
  ...options
}: Prefetch<ApiPath, ReqQuery, ReqBody, PagePath> & {
  children: React.ReactNode;
}) {
  const [prefetch, setIntersectionRef] = useApiPrefetch(options);
  return (
    <span onMouseEnter={prefetch} ref={setIntersectionRef}>
      {children}
    </span>
  );
}
// _____________________________________________________________________________
//
export function Link<
  PagePath extends keyof Pages,
  PageQuery extends Pages[PagePath],
  ApiPath extends keyof GetResBody,
  ReqQuery extends GetReqQuery[ApiPath],
  ReqBody extends GetReqBody[ApiPath]
>({
  path,
  query,
  apiPrefetch,
  children,
  ...props
}: LinkBase & {
  path: PagePath;
  query?: PageQuery;
  apiPrefetch?: Prefetch<ApiPath, ReqQuery, ReqBody, PagePath>;
}) {
  const href = mapPathParamFromQuery(path, query);
  if (!apiPrefetch) {
    return (
      <NextLink {...props} href={href}>
        <a>{children}</a>
      </NextLink>
    );
  }
  return (
    <NextLink {...props} href={href}>
      <a>
        <Prefetch {...apiPrefetch}>{children}</Prefetch>
      </a>
    </NextLink>
  );
}
