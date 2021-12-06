import { Link } from "@/components/Link";
import { useApiData } from "@/hooks/useApiData";
import { deleteApiData } from "@/utils/fetcher";
import { useRouter } from "next/dist/client/router";
import React from "react";
// _____________________________________________________________________________
//
const DeleteArticle = ({ id }: { id: string }) => {
  return (
    <button
      onClick={() => {
        deleteApiData("/api/articles/[id]", { query: { id } })
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
      }}
    >
      記事削除
    </button>
  );
};

const ArticleBase = ({ id }: { id: string }) => {
  const { data } = useApiData("/api/articles/[id]", { query: { id } });
  if (!data) return <>...loading</>;
  return (
    <div>
      <h1>{data.article.title}</h1>
      <p>{data.article.body}</p>
      <p>
        <Link
          path="/articles/[id]/details/[detail]"
          query={{
            id,
            detail: "abc",
          }}
        >
          abc
        </Link>
      </p>
      <hr />
      <DeleteArticle id={id} />
    </div>
  );
};

export const Article = () => {
  const { isReady, query } = useRouter();
  if (!(isReady && typeof query.id === "string")) {
    return <>...loading</>;
  }
  return <ArticleBase id={query.id} />;
};

export default Article;
