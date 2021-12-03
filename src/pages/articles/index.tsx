import { useApiData } from "@/hooks/useApiData";
import { useApiPrefetch } from "@/hooks/useApiPrefetch";
import { Article } from "@/models/articles";
import { postApiData } from "@/utils/fetcher";
import Link from "next/link";
import React from "react";
// _____________________________________________________________________________
//
const CreateArticle = () => {
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  return (
    <>
      <div>
        <input
          type="text"
          value={title}
          placeholder="タイトルを入力"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div>
        <textarea
          value={body}
          placeholder="本文を入力"
          onChange={(e) => {
            setBody(e.target.value);
          }}
        ></textarea>
      </div>
      <button
        onClick={() => {
          postApiData("/api/articles", {
            requestInit: { body: { title, body } },
          })
            .then((data) => {
              console.log(data);
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              setTitle("");
              setBody("");
            });
        }}
      >
        新規作成
      </button>
    </>
  );
};

const ArticleLink: React.VFC<{ article: Article }> = ({ article }) => {
  const onMouseEnter = useApiPrefetch("/api/articles/[id]", {
    query: { id: article.id },
    revalidate: 10,
  });
  return (
    <Link href={`/articles/${article.id}`}>
      <a onMouseEnter={onMouseEnter}>{article.title}</a>
    </Link>
  );
};

export const Articles = () => {
  const { data } = useApiData("/api/articles");
  if (!data) return <>...loading</>;
  return (
    <div>
      <h1>Articles</h1>
      <ul>
        {data.articles.map((article) => (
          <li key={article.id}>
            <ArticleLink article={article} />
          </li>
        ))}
      </ul>
      <hr />
      <CreateArticle />
    </div>
  );
};

export default Articles;
