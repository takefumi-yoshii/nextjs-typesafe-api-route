import Link from "next/link";
import React from "react";
// _____________________________________________________________________________
//
const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/users">
              <a>Users</a>
            </Link>
          </li>
          <li>
            <Link href="/articles">
              <a>Articles</a>
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
