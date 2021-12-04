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
              prefetchProps={{
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
              prefetchProps={{
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
              prefetchProps={{
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
