import Link from "next/link";
import React from "react";
import AuthModal from "../Modals/AuthModal";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleClick = () => {
    setAuthModalState((prev) => ({ ...prev, isOpen: true }));
  };

  return (
    <div className="flex items-center justify-between px-2 sm:px-12 md:px-24">
      <Link href="/" className="flex h-20 items-center justify-center">
        <img src="/logo.png" alt="Leetcode" className="h-1/2" />
      </Link>
      <div className="flex items-center">
        <button
          className="rounded-md border-2 border-transparent bg-brand-orange px-2 py-2 font-medium text-white transition duration-300 ease-in-out hover:border-2 hover:border-brand-orange
                hover:bg-white hover:text-brand-orange sm:px-4"
          onClick={handleClick}
        >
          Sign in
        </button>
      </div>
    </div>
  );
};
export default Navbar;
