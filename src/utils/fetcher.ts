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
import qs from "query-string";
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
  {
    query,
    requestInit,
  }: {
    query?: ReqQuery;
    requestInit?: Omit<RequestInit, "body"> & { body?: ReqBody };
  } = {}
) {
  const url = query ? `${key}?${qs.stringify(query)}` : key;
  const { data, error } = await fetch(url, {
    ...requestInit,
    method: "POST",
    headers: { ...defaultHeaders, ...requestInit?.headers },
    body: requestInit?.body ? JSON.stringify(requestInit.body) : undefined,
  }).then((res) => res.json());
  if (error) throw error;
  return data as ResBody;
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
  {
    query,
    requestInit,
  }: {
    query?: ReqQuery;
    requestInit?: Omit<RequestInit, "body"> & { body?: ReqBody };
  } = {}
) {
  const url = query ? `${key}?${qs.stringify(query)}` : key;
  const { data, error } = await fetch(url, {
    ...requestInit,
    method: "PUT",
    headers: { ...defaultHeaders, ...requestInit?.headers },
    body: requestInit?.body ? JSON.stringify(requestInit.body) : undefined,
  }).then((res) => res.json());
  if (error) throw error;
  return data as ResBody;
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
  {
    query,
    requestInit,
  }: {
    query?: ReqQuery;
    requestInit?: Omit<RequestInit, "body"> & { body?: ReqBody };
  } = {}
) {
  const url = query ? `${key}?${qs.stringify(query)}` : key;
  const { data, error } = await fetch(url, {
    ...requestInit,
    method: "PATCH",
    headers: { ...defaultHeaders, ...requestInit?.headers },
    body: requestInit?.body ? JSON.stringify(requestInit.body) : undefined,
  }).then((res) => res.json());
  if (error) throw error;
  return data as ResBody;
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
  {
    query,
    requestInit,
  }: {
    query?: ReqQuery;
    requestInit?: Omit<RequestInit, "body"> & { body?: ReqBody };
  } = {}
) {
  const url = query ? `${key}?${qs.stringify(query)}` : key;
  const { data, error } = await fetch(url, {
    ...requestInit,
    method: "DELETE",
    headers: { ...defaultHeaders, ...requestInit?.headers },
    body: requestInit?.body ? JSON.stringify(requestInit.body) : undefined,
  }).then((res) => res.json());
  if (error) throw error;
  return data as ResBody;
}
