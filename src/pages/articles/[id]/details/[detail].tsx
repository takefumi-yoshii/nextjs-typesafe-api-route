import { useRouter } from "next/dist/client/router";
import React from "react";
// _____________________________________________________________________________
//
export const Detail = () => {
  const { isReady, query } = useRouter();
  if (
    !(
      isReady &&
      typeof query.id === "string" &&
      typeof query.detail === "string"
    )
  ) {
    return <>...loading</>;
  }
  return (
    <>
      <h1>id: {query.id}</h1>
      <p>detail: {query.detail}</p>
    </>
  );
};

export default Detail;
