import { useApiData } from "@/hooks/useApiData";
import { deleteApiData } from "@/utils/fetcher";
import { useRouter } from "next/dist/client/router";
import React from "react";
// _____________________________________________________________________________
//
const DeleteUser = ({ id }: { id: string }) => {
  return (
    <button
      onClick={() => {
        deleteApiData("/api/users/[id]", { query: { id } })
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
      }}
    >
      ユーザー削除
    </button>
  );
};

const UserBase = ({ id }: { id: string }) => {
  const { data, error } = useApiData("/api/users/[id]", {
    query: { id },
  });
  if (error) {
    return <h1>{error.httpStatus}</h1>;
  }
  if (!data) return <>...loading</>;
  return (
    <div>
      <h1>User</h1>
      <p>{data.user.name}</p>
      <hr />
      <DeleteUser id={id} />
    </div>
  );
};

export const User = () => {
  const { isReady, query } = useRouter();
  if (!(isReady && typeof query.id === "string")) {
    return <>...loading</>;
  }
  return <UserBase id={query.id} />;
};

export default User;
