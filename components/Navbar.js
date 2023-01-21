import Link from "next/link";
import Image from "next/image";
import React from "react";

import { AuthContext } from "../stores/authContext";

export default function Navbar() {
  const { user, authReady, login, logout } = React.useContext(AuthContext);
  console.log(user);
  console.log(authReady);

  return (
    <div className='container'>
      <nav>
        <Image src='/rupee.png' alt='' width={50} height={48} />
        <h1>Gaming Vibes</h1>

        {authReady && (
          <ul>
            <li>
              <Link href={"/"}>Home</Link>
            </li>

            <li>
              <Link href={"/guides"}>Guides</Link>
            </li>

            {!user && (
              <li onClick={login} className='btn'>
                Login/Signup
              </li>
            )}

            {user && <li>{user.email}</li>}

            {user && (
              <li onClick={logout} className='btn'>
                Logout
              </li>
            )}
          </ul>
        )}
      </nav>

      <div className='banner'>
        <Image src='/banner.png' alt='' width={966} height={276} />
      </div>
    </div>
  );
}
