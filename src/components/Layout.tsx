import { Link } from "@/components/Link";
import React from "react";
// _____________________________________________________________________________
//
const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link
              path="/"
              swrPrefetch={{
                path: "/api/greet",
                query: { name: "user" },
                ignoreRoute: "/",
              }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              path="/users"
              swrPrefetch={{
                path: "/api/users",
                ignoreRoute: "/users",
              }}
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              path="/articles"
              swrPrefetch={{
                path: "/api/articles",
                ignoreRoute: "/articles",
              }}
            >
              Articles
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
