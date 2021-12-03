import { useApiPrefetch } from "@/hooks/useApiPrefetch";
import Link from "next/link";
import React from "react";
// _____________________________________________________________________________
//
const revalidate = 10;

const Layout: React.FC = ({ children }) => {
  const handleMouseEnterHome = useApiPrefetch("/api/greet", {
    query: { name: "user" },
    revalidate,
  });
  const handleMouseEnterUsers = useApiPrefetch("/api/users", {
    revalidate,
  });
  const handleMouseEnterArticles = useApiPrefetch("/api/articles", {
    revalidate,
  });
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a onMouseEnter={handleMouseEnterHome}>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/users">
              <a onMouseEnter={handleMouseEnterUsers}>Users</a>
            </Link>
          </li>
          <li>
            <Link href="/articles">
              <a onMouseEnter={handleMouseEnterArticles}>Articles</a>
            </Link>
          </li>
        </ul>
      </nav>
      <hr />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
