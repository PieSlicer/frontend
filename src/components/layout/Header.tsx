'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from "next/router";
import Logo from 'public/logo.jpeg';

import { Navbar, Button, CustomFlowbiteTheme, Flowbite } from 'flowbite-react';

const MENU_ITEMS = [
  {
    name: "Home",
    href: "/"
  },
  {
    name: "Marketplace",
    href: "/marketplace",
  },
  {
    name: "Treasury",
    href: "/treasury",
  },
]


export default function Header() {
  const router = useRouter();

  const customTheme: CustomFlowbiteTheme = {
    navbar: {
      root: {
        base: "p-9 text-2xl"
      },
      link: {
        base: "block py-2 pr-4 pl-3 md:p-0 text-lg",
        /* active: {
          "on": "bg-secondary md:bg-transparent md:text-secondary",
          "off": "border-b border-gray-100 text-white hover:bg-gray-50 md:border-0 md:hover:bg-transparent md:hover:text-secondary"
        } */
      }
    }
  };

  function isActive(href: string) {
    if (href === "/") {
      return router.pathname === href;
    }
    return router.pathname.indexOf(href) !== -1;
  }

  return (
    <div className=''>
      <Flowbite theme={{ theme: customTheme }}>
        <Navbar fluid rounded>
          <Navbar.Brand as={Link} href="/">
            <Image src={Logo} height={50} width={50} className="mr-3 h-6 sm:h-9" alt="Pie Slicer Logo" />
            <span className="self-center whitespace-nowrap text-2xl font-semibold">Pie Slicer</span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            {
              MENU_ITEMS.map((item, index) => (
                <Navbar.Link key={index} href={item.href} active={isActive(item.href)}>
                  {item.name}
                </Navbar.Link>
              ))
            }
          </Navbar.Collapse>
        </Navbar>
      </Flowbite>
    </div>
  );
}
