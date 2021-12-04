import { useApiPrefetch } from "@/hooks/useApiPrefetch";
import Link from "next/link";
import React from "react";
// _____________________________________________________________________________
//
const revalidate = 10;

const Layout: React.FC = ({ children }) => {
  const prefetchGreet = useApiPrefetch("/api/greet", {
    query: { name: "user" },
    revalidate,
  });
  const prefetchUsers = useApiPrefetch("/api/users", {
    revalidate,
  });
  const prefetchArticles = useApiPrefetch("/api/articles", {
    revalidate,
  });
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a onMouseEnter={prefetchGreet}>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/users">
              <a onMouseEnter={prefetchUsers}>Users</a>
            </Link>
          </li>
          <li>
            <Link href="/articles">
              <a onMouseEnter={prefetchArticles}>Articles</a>
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
