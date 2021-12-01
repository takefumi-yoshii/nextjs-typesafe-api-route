import { Article, articles } from "@/models/articles";
import type { ApiHandler } from "@/types/pages/api";
// _____________________________________________________________________________
//
export type GetHandler = ApiHandler<{ id: string }, {}, { article: Article }>;
const getHandler: GetHandler = (req, res) => {
  if (!req.query.id) {
    res
      .status(400)
      .json({ error: { httpStatus: 400, message: "Invalid Request" } });
    return;
  }
  const article = articles.find((article) => article.id === req.query.id);
  if (!article) {
    res.status(404).json({ error: { httpStatus: 404, message: "Not Found" } });
    return;
  }
  res.status(200).json({
    data: { article },
  });
};
// _____________________________________________________________________________
//
export type PutHandler = ApiHandler<
  { id: string },
  { title: string; body: string },
  { id: string; title: string; body: string }
>;
const putHandler: PutHandler = (req, res) => {
  if (!req.query.id || !req.body?.title || !req.body?.body) {
    res
      .status(400)
      .json({ error: { httpStatus: 400, message: "Invalid Request" } });
    return;
  }
  res.status(200).json({
    data: {
      id: req.query.id,
      title: req.body.title,
      body: req.body.body,
    },
  });
};
// _____________________________________________________________________________
//
export type DeleteHandler = ApiHandler<{ id: string }, {}, { id: string }>;
const deleteHandler: DeleteHandler = (req, res) => {
  if (!req.query.id) {
    res
      .status(400)
      .json({ error: { httpStatus: 400, message: "Invalid Request" } });
    return;
  }
  res.status(200).json({ data: { id: req.query.id } });
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
