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
