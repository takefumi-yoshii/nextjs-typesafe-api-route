import qs from "query-string";
// _____________________________________________________________________________
//
export type ParsedUrlQuery = { [k: string]: string | string[] | undefined };
// _____________________________________________________________________________
//
export function mapPathParamFromQuery(path: string, query?: ParsedUrlQuery) {
  const pathParams: { [k: string]: undefined } = {};
  const url = path
    .split("/")
    .map((row) => {
      if (!row.match(/\[.*\]/)) return row;
      const key = row.replace(/(\[|\])/g, "");
      pathParams[key] = undefined;
      if (!query) throw new Error(`Invalid query param. ${row} is required.`);
      const value = query[key];
      if (!value || typeof value !== "string")
        throw new Error(`Invalid query param. ${row} should be string.`);
      return value;
    })
    .join("/");
  const queryString = qs.stringify({ ...query, ...pathParams });
  return queryString ? `${url}?${queryString}` : url;
}
