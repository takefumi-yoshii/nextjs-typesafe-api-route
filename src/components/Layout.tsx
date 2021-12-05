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
              linkProps={{ href: "/" }}
              apiPrefetch={{
                path: "/api/greet",
                query: { name: "user" },
                revalidate: 10,
              }}
            >
              Home
            </LinkWithApiPrefetch>
          </li>
          <li>
            <LinkWithApiPrefetch
              linkProps={{ href: "/users" }}
              apiPrefetch={{
                path: "/api/users",
                revalidate: 10,
              }}
            >
              Users
            </LinkWithApiPrefetch>
          </li>
          <li>
            <LinkWithApiPrefetch
              linkProps={{ href: "/articles" }}
              apiPrefetch={{
                path: "/api/articles",
                revalidate: 10,
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
