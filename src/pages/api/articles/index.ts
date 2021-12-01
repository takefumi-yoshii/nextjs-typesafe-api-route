import { Article, articles } from "@/models/articles";
import type { ApiHandler } from "@/types/pages/api";
// _____________________________________________________________________________
//
export type GetHandler = ApiHandler<
  { articles: Article[] },
  { page?: string },
  {}
>;
const getHandler: GetHandler = (_req, res) => {
  res.status(200).json({ data: { articles } });
};
// _____________________________________________________________________________
//
export type PostHandler = ApiHandler<
  { id: string; title: string; body: string },
  {},
  { title: string; body: string }
>;
const postHandler: PostHandler = (req, res) => {
  if (!req.body?.title || !req.body?.body) {
    res.status(400).json({
      error: { httpStatus: 400, message: "Invalid Request" },
    });
    return;
  }
  res
    .status(201)
    .json({ data: { id: "1", title: req.body.title, body: req.body.body } });
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
