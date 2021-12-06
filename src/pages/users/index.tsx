import { LinkWithApiPrefetch } from "@/components/LinkWithApiPrefetch";
import { useApiData } from "@/hooks/useApiData";
import { postApiData } from "@/utils/fetcher";
import React from "react";
// _____________________________________________________________________________
//
const CreateUser = () => {
  const [name, setName] = React.useState("");
  return (
    <>
      <input
        type="text"
        value={name}
        placeholder="ユーザー名を入力"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button
        onClick={() => {
          postApiData("/api/users", { requestInit: { body: { name } } })
            .then((data) => {
              console.log(data);
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              setName("");
            });
        }}
      >
        新規作成
      </button>
    </>
  );
};

export const Users = () => {
  const { data } = useApiData("/api/users");
  if (!data) return <>...loading</>;
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data.users.map((user) => (
          <li key={user.id}>
            <LinkWithApiPrefetch
              linkProps={{ path: "/users/[id]", query: { id: user.id } }}
              apiPrefetch={{
                path: "/api/users/[id]",
                query: { id: user.id },
              }}
            >
              {user.name}
            </LinkWithApiPrefetch>
          </li>
        ))}
      </ul>
      <hr />
      <CreateUser />
    </div>
  );
};

export default Users;
