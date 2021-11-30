import type {
  DeleteReqBody,
  DeleteReqQuery,
  DeleteResBody,
  PatchReqBody,
  PatchReqQuery,
  PatchResBody,
  PostReqBody,
  PostReqQuery,
  PostResBody,
  PutReqBody,
  PutReqQuery,
  PutResBody,
} from "@/types/pages/api";
import queryString from "query-string";
// _____________________________________________________________________________
//
const defaultHeaders = {
  "Content-Type": "application/json",
};
// _____________________________________________________________________________
//
export async function postApiData<
  T extends keyof PostResBody,
  ReqQuery extends PostReqQuery[T],
  ResBody extends PostResBody[T],
  ReqBody extends PostReqBody[T]
>(
  key: T,
  options: {
    query?: ReqQuery;
    requestInit?: Omit<RequestInit, "body"> & { body: ReqBody };
  } = {}
) {
  const qs = queryString.stringify(options.query as {});
  const url = qs ? `${key}?${qs}` : key;
  const data: ResBody = await fetch(url, {
    ...options.requestInit,
    body: options.requestInit?.body
      ? JSON.stringify(options.requestInit?.body)
      : undefined,
    method: "POST",
    headers: {
      ...defaultHeaders,
      ...options.requestInit?.headers,
    },
  }).then(async (res) => {
    const { data, error } = await res.json();
    if (error) throw error;
    return data;
  });
  return data;
}
// _____________________________________________________________________________
//
export async function putApiData<
  T extends keyof PutResBody,
  ReqQuery extends PutReqQuery[T],
  ResBody extends PutResBody[T],
  ReqBody extends PutReqBody[T]
>(
  key: T,
  options: {
    query?: ReqQuery;
    requestInit?: Omit<RequestInit, "body"> & { body: ReqBody };
  } = {}
) {
  const qs = queryString.stringify(options.query as {});
  const url = qs ? `${key}?${qs}` : key;
  const data: ResBody = await fetch(url, {
    ...options.requestInit,
    body: options.requestInit?.body
      ? JSON.stringify(options.requestInit?.body)
      : undefined,
    method: "PUT",
    headers: {
      ...defaultHeaders,
      ...options.requestInit?.headers,
    },
  }).then(async (res) => {
    const { data, error } = await res.json();
    if (error) throw error;
    return data;
  });
  return data;
}
// _____________________________________________________________________________
//
export async function patchApiData<
  T extends keyof PatchResBody,
  ReqQuery extends PatchReqQuery[T],
  ResBody extends PatchResBody[T],
  ReqBody extends PatchReqBody[T]
>(
  key: T,
  options: {
    query?: ReqQuery;
    requestInit?: Omit<RequestInit, "body"> & { body: ReqBody };
  } = {}
) {
  const qs = queryString.stringify(options.query as {});
  const url = qs ? `${key}?${qs}` : key;
  const data: ResBody = await fetch(url, {
    ...options.requestInit,
    body: options.requestInit?.body
      ? JSON.stringify(options.requestInit?.body)
      : undefined,
    method: "PATCH",
    headers: {
      ...defaultHeaders,
      ...options.requestInit?.headers,
    },
  }).then(async (res) => {
    const { data, error } = await res.json();
    if (error) throw error;
    return data;
  });
  return data;
}
// _____________________________________________________________________________
//
export async function deleteApiData<
  T extends keyof DeleteResBody,
  ReqQuery extends DeleteReqQuery[T],
  ResBody extends DeleteResBody[T],
  ReqBody extends DeleteReqBody[T]
>(
  key: T,
  options: {
    query?: ReqQuery;
    requestInit?: Omit<RequestInit, "body"> & { body: ReqBody };
  } = {}
) {
  const qs = queryString.stringify(options.query as {});
  const url = qs ? `${key}?${qs}` : key;
  const data: ResBody = await fetch(url, {
    ...options.requestInit,
    body: options.requestInit?.body
      ? JSON.stringify(options.requestInit?.body)
      : undefined,
    method: "DELETE",
    headers: {
      ...defaultHeaders,
      ...options.requestInit?.headers,
    },
  }).then(async (res) => {
    const { data, error } = await res.json();
    if (error) throw error;
    return data;
  });
  return data;
}
