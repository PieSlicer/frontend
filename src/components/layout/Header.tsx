'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from "next/router";
import Logo from 'public/logo.png';

import { Navbar, CustomFlowbiteTheme, Flowbite } from 'flowbite-react';
import ConnectButton from '@/components/ConnectButton';

const MENU_ITEMS = [
  {
    name: "Marketplace",
    href: "/",
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
      }
    }
  };

  function isActive(href: string) {
    return router.pathname === href;
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
                <Link key={index} href={item.href} className={isActive(item.href) ? "bg-secondary md:bg-transparent md:text-secondary text-lg" : "text-lg"}>
                  {item.name}
                </Link>
              ))
            }
            <div className='md:mt-[-10px]'>
              <ConnectButton />
            </div>
          </Navbar.Collapse>
        </Navbar>
      </Flowbite>
    </div>
  );
}
