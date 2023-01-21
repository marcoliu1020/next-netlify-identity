import Link from "next/link";
import Image from "next/image";
import React from "react";

import { AuthContext } from "../stores/authContext";

export default function Navbar() {
  const { user, login, logout } = React.useContext(AuthContext);
  console.log(user);

  return (
    <div className='container'>
      <nav>
        <Image src='/rupee.png' alt='' width={50} height={48} />
        <h1>Gaming Vibes</h1>
        <ul>
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/guides"}>Guides</Link>
          </li>
          <li onClick={login} className='btn'>
            Login/Signup
          </li>
          <li onClick={logout} className='btn'>
            Logout
          </li>
        </ul>
      </nav>

      <div className='banner'>
        <Image src='/banner.png' alt='' width={966} height={276} />
      </div>
    </div>
  );
}
