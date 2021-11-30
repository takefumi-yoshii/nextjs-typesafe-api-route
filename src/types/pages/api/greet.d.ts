import type { GetHandler } from "@/pages/api/greet";
import type { ReqBody, ReqQuery, ResBody } from "@/types/api";

declare module "@/types/pages/api" {
  interface GetResBody {
    "/api/greet": ResBody<GetHandler>;
  }
  interface GetReqQuery {
    "/api/greet": ReqQuery<GetHandler>;
  }
  interface GetReqBody {
    "/api/greet": ReqBody<GetHandler>;
  }
}
