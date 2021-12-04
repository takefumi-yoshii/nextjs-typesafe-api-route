import { useApiData } from "@/hooks/useApiData";
import { useApiPrefetch } from "@/hooks/useApiPrefetch";
import { User } from "@/models/users";
import { postApiData } from "@/utils/fetcher";
import Link from "next/link";
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

const UserLink: React.VFC<{ user: User }> = ({ user }) => {
  const prefetch = useApiPrefetch("/api/users/[id]", {
    query: { id: user.id },
    revalidate: 10,
  });
  return (
    <Link href={`/users/${user.id}`}>
      <a onMouseEnter={prefetch}>{user.name}</a>
    </Link>
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
            <UserLink user={user} />
          </li>
        ))}
      </ul>
      <hr />
      <CreateUser />
    </div>
  );
};

export default Users;
