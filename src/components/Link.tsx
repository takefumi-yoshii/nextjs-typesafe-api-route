import type { Pages } from "@/types/pages";
import { mapPathParamFromQuery } from "@/utils/mapPathParamFromQuery";
import NextLink from "next/link";
import React from "react";
// _____________________________________________________________________________
//
export function Link<T extends keyof Pages, Q extends Pages[T]>({
  path,
  query,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof NextLink>, "href"> & {
  path: T;
  query?: Q;
}) {
  return <NextLink {...props} href={mapPathParamFromQuery(path, query)} />;
}
