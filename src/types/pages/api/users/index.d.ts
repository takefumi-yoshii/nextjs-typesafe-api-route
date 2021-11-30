import type { GetHandler, PostHandler } from "@/pages/api/users";
import type { ReqBody, ReqQuery, ResBody } from "@/types/api";

declare module "@/types/pages/api" {
  interface GetResBody {
    "/api/users": ResBody<GetHandler>;
  }
  interface GetReqQuery {
    "/api/users": ReqQuery<GetHandler>;
  }
  interface GetReqBody {
    "/api/users": ReqBody<GetHandler>;
  }
  interface PostResBody {
    "/api/users": ResBody<PostHandler>;
  }
  interface PostReqQuery {
    "/api/users": ReqQuery<PostHandler>;
  }
  interface PostReqBody {
    "/api/users": ReqBody<PostHandler>;
  }
}
