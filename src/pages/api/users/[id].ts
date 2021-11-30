import { User, users } from "@/models/users";
import type { ApiHandler } from "@/types/pages/api";
// _____________________________________________________________________________
//
export type GetHandler = ApiHandler<{ user: User }, { id: string }, {}>;
const getHandler: GetHandler = (req, res) => {
  if (!req.query.id) {
    res
      .status(400)
      .json({ error: { httpStatus: 400, message: "Invalid Request" } });
    return;
  }
  const user = users.find((user) => user.id === req.query.id);
  if (!user) {
    res.status(404).json({ error: { httpStatus: 404, message: "Not Found" } });
    return;
  }
  res.status(200).json({
    data: { user },
  });
};
// _____________________________________________________________________________
//
export type PutHandler = ApiHandler<{}, { id: string }, { name: string }>;
const putHandler: PutHandler = (req, res) => {
  if (!req.query.id || !req.body?.name) {
    res
      .status(400)
      .json({ error: { httpStatus: 400, message: "Invalid Request" } });
    return;
  }
  res.status(200).json({ data: {} });
};
// _____________________________________________________________________________
//
export type DeleteHandler = ApiHandler<{}, { id: string }, {}>;
const deleteHandler: DeleteHandler = (req, res) => {
  if (!req.query.id) {
    res
      .status(400)
      .json({ error: { httpStatus: 400, message: "Invalid Request" } });
    return;
  }
  res.status(200).json({ data: {} });
};
// _____________________________________________________________________________
//
const handler: ApiHandler = (req, res) => {
  switch (req.method) {
    case "GET":
      getHandler(req, res);
      break;
    case "PUT":
      putHandler(req, res);
      break;
    case "DELETE":
      deleteHandler(req, res);
      break;
    default:
      res
        .status(405)
        .json({ error: { httpStatus: 405, message: "Method Not Allowed" } });
  }
};
export default handler;
