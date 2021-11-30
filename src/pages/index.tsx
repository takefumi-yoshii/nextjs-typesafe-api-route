import { useApiData } from "@/hooks/useApiData";
import { deleteApiData, postApiData, putApiData } from "@/utils/fetcher";
import React from "react";
// _____________________________________________________________________________
//
const Users = () => {
  const { data } = useApiData("/api/users");
  if (!data) return <>...loading</>;
  return (
    <div>
      <h1>Users</h1>
      {data.users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
};

const User = () => {
  const { data } = useApiData("/api/users/[id]", {
    query: { id: "123" },
  });
  if (!data) return <>...loading</>;
  return (
    <div>
      <h1>User</h1>
      <p>{data.user.name}</p>
    </div>
  );
};

const Greet = () => {
  const { data } = useApiData("/api/greet", { query: { name: "123" } });
  if (!data) return <>...loading</>;
  return (
    <div>
      <h1>Greet</h1>
      <p>{data.message}</p>
    </div>
  );
};

export default function Home() {
  React.useEffect(() => {
    postApiData("/api/users", { requestInit: { body: { name: "ほげ" } } })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    putApiData("/api/users/[id]", {
      query: { id: "1" },
      requestInit: { body: { name: "aa" } },
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    deleteApiData("/api/users/[id]", { query: { id: "1" } })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <Users />
      <hr />
      <User />
      <hr />
      <Greet />
    </div>
  );
}
