import { LinkWithApiPrefetch } from "@/components/LinkWithApiPrefetch";
import React from "react";
// _____________________________________________________________________________
//
const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <LinkWithApiPrefetch
              linkProps={{ path: "/" }}
              apiPrefetch={{
                path: "/api/greet",
                query: { name: "user" },
                ignoreRoute: "/",
              }}
            >
              Home
            </LinkWithApiPrefetch>
          </li>
          <li>
            <LinkWithApiPrefetch
              linkProps={{ path: "/users" }}
              apiPrefetch={{
                path: "/api/users",
                ignoreRoute: "/users",
              }}
            >
              Users
            </LinkWithApiPrefetch>
          </li>
          <li>
            <LinkWithApiPrefetch
              linkProps={{ path: "/articles" }}
              apiPrefetch={{
                path: "/api/articles",
                ignoreRoute: "/articles",
              }}
            >
              Articles
            </LinkWithApiPrefetch>
          </li>
        </ul>
      </nav>
      <hr />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
