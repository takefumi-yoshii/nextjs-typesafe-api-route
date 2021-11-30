import { User, users } from "@/models/users";
import type { ApiHandler } from "@/types/pages/api";
// _____________________________________________________________________________
//
export type GetHandler = ApiHandler<{ users: User[] }, { page?: string }, {}>;
const getHandler: GetHandler = (_req, res) => {
  res.status(200).json({ data: { users } });
};
// _____________________________________________________________________________
//
export type PostHandler = ApiHandler<
  { id: string; name: string },
  {},
  { name: string }
>;
const postHandler: PostHandler = (req, res) => {
  if (!req.body?.name) {
    res.status(400).json({
      error: { httpStatus: 400, message: "Invalid Request" },
    });
    return;
  }
  res.status(201).json({ data: { id: "1", name: req.body.name } });
};
// _____________________________________________________________________________
//
const handler: ApiHandler = (req, res) => {
  switch (req.method) {
    case "GET":
      getHandler(req, res);
      break;
    case "POST":
      postHandler(req, res);
      break;
    default:
      res
        .status(405)
        .json({ error: { httpStatus: 405, message: "Method Not Allowed" } });
  }
};
export default handler;
