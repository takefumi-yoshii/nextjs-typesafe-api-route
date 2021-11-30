import type { NextApiRequest, NextApiResponse } from "next";
// _____________________________________________________________________________
//
export type Error = {
  error: {
    httpStatus: number;
    message: string;
  };
};
export type Data<T> = {
  data: T;
};
export type ApiHandler<ResBody = unknown, ReqQuery = unknown, ReqBody = any> = (
  req: Omit<NextApiRequest, "body" | "query"> & {
    query: Partial<ReqQuery>;
    body?: ReqBody;
  },
  res: NextApiResponse<Data<ResBody> | Error>
) => void | Promise<void>;

export type ResBody<T> = T extends ApiHandler<infer I, unknown, any>
  ? I
  : never;
export type ReqQuery<T> = T extends ApiHandler<unknown, infer I, any>
  ? I
  : never;
export type ReqBody<T> = T extends ApiHandler<unknown, unknown, infer I>
  ? I
  : never;
