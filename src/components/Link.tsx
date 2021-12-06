import type { Pages } from "@/types/pages";
import { mapPathParamFromQuery } from "@/utils/mapPathParamFromQuery";
import NextLink from "next/link";
import React from "react";
// _____________________________________________________________________________
//
export type LinkProps<P, Q> = Omit<
  React.ComponentPropsWithoutRef<typeof NextLink>,
  "href"
> & {
  path: P;
  query?: Q;
};
// _____________________________________________________________________________
//
export function Link<P extends keyof Pages, Q extends Pages[P]>({
  path,
  query,
  ...props
}: LinkProps<P, Q>) {
  return <NextLink {...props} href={mapPathParamFromQuery(path, query)} />;
}
