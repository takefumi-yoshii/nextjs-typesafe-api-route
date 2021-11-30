import type { ApiHandler } from "@/types/api";
// _____________________________________________________________________________
//
export type GetHandler = ApiHandler<{ message: string }, { name: string }, {}>;
const getHandler: GetHandler = (req, res) => {
  if (!req.query.name) {
    res
      .status(400)
      .json({ error: { httpStatus: 400, message: "Invalid Request" } });
    return;
  }
  res.status(200).json({ data: { message: `hello ${req.query.name}` } });
};
// _____________________________________________________________________________
//
const handler: ApiHandler = (req, res) => {
  switch (req.method) {
    case "GET":
      getHandler(req, res);
      break;
    default:
      res
        .status(405)
        .json({ error: { httpStatus: 405, message: "Method Not Allowed" } });
  }
};
export default handler;
