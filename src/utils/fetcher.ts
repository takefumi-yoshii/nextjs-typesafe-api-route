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
export async function postApiData<
  T extends keyof PostResBody,
  Q extends PostReqQuery[T],
  U extends PostResBody[T],
  K extends PostReqBody[T]
>(key: T, query?: Q, requestInit?: Omit<RequestInit, "body"> & { body: K }) {
  const qs = queryString.stringify(query as {});
  const url = qs ? `${key}?${qs}` : key;
  const data: U = await fetch(url, {
    ...requestInit,
    body: requestInit?.body ? JSON.stringify(requestInit?.body) : undefined,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...requestInit?.headers,
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
  Q extends PutReqQuery[T],
  U extends PutResBody[T],
  K extends PutReqBody[T]
>(key: T, query?: Q, requestInit?: Omit<RequestInit, "body"> & { body: K }) {
  const qs = queryString.stringify(query as {});
  const url = qs ? `${key}?${qs}` : key;
  const data: U = await fetch(url, {
    ...requestInit,
    body: requestInit?.body ? JSON.stringify(requestInit?.body) : undefined,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...requestInit?.headers,
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
  Q extends PatchReqQuery[T],
  U extends PatchResBody[T],
  K extends PatchReqBody[T]
>(key: T, query?: Q, requestInit?: Omit<RequestInit, "body"> & { body: K }) {
  const qs = queryString.stringify(query as {});
  const url = qs ? `${key}?${qs}` : key;
  const data: U = await fetch(url, {
    ...requestInit,
    body: requestInit?.body ? JSON.stringify(requestInit?.body) : undefined,
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...requestInit?.headers,
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
  Q extends DeleteReqQuery[T],
  U extends DeleteResBody[T],
  K extends DeleteReqBody[T]
>(key: T, query?: Q, requestInit?: Omit<RequestInit, "body"> & { body: K }) {
  const qs = queryString.stringify(query as {});
  const url = qs ? `${key}?${qs}` : key;
  const data: U = await fetch(url, {
    ...requestInit,
    body: requestInit?.body ? JSON.stringify(requestInit?.body) : undefined,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...requestInit?.headers,
    },
  }).then(async (res) => {
    const { data, error } = await res.json();
    if (error) throw error;
    return data;
  });
  return data;
}
