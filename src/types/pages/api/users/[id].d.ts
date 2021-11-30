import type {
  DeleteHandler,
  GetHandler,
  PutHandler,
} from "@/pages/api/users/[id]";
import type { ReqBody, ReqQuery, ResBody } from "@/types/api";

declare module "@/types/pages/api" {
  interface GetResBody {
    "/api/users/[id]": ResBody<GetHandler>;
  }
  interface GetReqQuery {
    "/api/users/[id]": ReqQuery<GetHandler>;
  }
  interface GetReqBody {
    "/api/users/[id]": ReqBody<GetHandler>;
  }
  interface PutResBody {
    "/api/users/[id]": ResBody<PutHandler>;
  }
  interface PutReqQuery {
    "/api/users/[id]": ReqQuery<PutHandler>;
  }
  interface PutReqBody {
    "/api/users/[id]": ReqBody<PutHandler>;
  }
  interface DeleteResBody {
    "/api/users/[id]": ResBody<DeleteHandler>;
  }
  interface DeleteReqQuery {
    "/api/users/[id]": ReqQuery<DeleteHandler>;
  }
  interface DeleteReqBody {
    "/api/users/[id]": ReqBody<DeleteHandler>;
  }
}
