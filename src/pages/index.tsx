import { useApiData } from "@/hooks/useApiData";
import React from "react";
// _____________________________________________________________________________
//
const Greet = () => {
  const { data } = useApiData("/api/greet", { query: { name: "user" } });
  if (!data) return <>...loading</>;
  return (
    <div>
      <h1>Greet</h1>
      <p>{data.message}</p>
    </div>
  );
};

export default Greet;
