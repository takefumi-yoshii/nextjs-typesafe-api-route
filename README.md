# nextjs-typesafe-api-routes

This is a Type-Safe solution for Next.js API Routes.There was a risk of making some mistakes between API Routes and Client.By using this solution, it is possible to build a type-safe environment by linking both type inferences.

## 1.Define API Routes Handlers

First, define API Routes handler with `ApiHandler`.As defined below, it is necessary to divide the handler for each request method.

```typescript
import type { ApiHandler } from "@/types/pages/api";

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
```

Generics for `ApiHandler`, expect three Generics `ResBody, ReqQuery, ReqBody` in order.

## 2.Generate Type Definitions

Run below npm scripts, then generate api types into `src/types/pages/api/**/*`.

```shell
$ npm run gen:apitype
```

## 3.Check Type Inference in Client

`useApiData` provides type inference from the specified string such as `"/api/greet"`.

```typescript
const { data } = useApiData("/api/greet", { query: { name: "user" } });
```
