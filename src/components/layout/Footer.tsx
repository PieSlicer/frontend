
'use client';

import { Footer } from 'flowbite-react';
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';

export default function CustomFooter() {
  return (
    <Footer container>
      <div className="w-full">
        <div className="w-full sm:flex sm:items-center justify-between">
          <Footer.Copyright href="/" by="Pie Slicer" year={2023} />
          <div className="mt-4 flex space-x-12 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
