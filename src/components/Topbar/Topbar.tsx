import { auth } from "@/firebase/firebase";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Logout from "../Buttons/Logout";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";

type TopbarProps = {};

const Topbar: React.FC<TopbarProps> = () => {
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <nav className="relative flex h-[50px] w-full shrink-0 items-center bg-dark-layer-1 px-5 text-dark-gray-7">
      <div
        className={`mx-auto flex w-full max-w-[1200px] items-center justify-between`}
      >
        <Link href="/" className="h-[22px] flex-1">
          <Image src="/logo-full.png" alt="Logo" height={100} width={100} />
        </Link>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <div>
            <a
              href="https://www.buymeacoffee.com/burakorkmezz"
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer rounded bg-dark-fill-3 px-3 py-1.5 text-brand-orange hover:bg-dark-fill-2"
            >
              Premium
            </a>
          </div>
          {!user && (
            <Link
              href="/auth"
              onClick={() =>
                setAuthModalState((prev) => ({
                  ...prev,
                  isOpen: true,
                  type: "login",
                }))
              }
            >
              <button className="cursor-pointer rounded bg-dark-fill-3 px-2 py-1 ">
                Sign In
              </button>
            </Link>
          )}
          {user && (
            <div className="group relative cursor-pointer">
              <img
                src="/avatar.png"
                alt="user profile"
                className="h-8 w-8 rounded-full"
              />
              <div
                className="absolute left-2/4 top-10 z-40  mx-auto -translate-x-2/4 scale-0 rounded bg-dark-layer-1 p-2 text-brand-orange shadow-lg transition-all 
		duration-300 ease-in-out group-hover:scale-100"
              >
                <p className="text-sm">{user.email}</p>
              </div>
            </div>
          )}
          {user && <Logout />}
        </div>
      </div>
    </nav>
  );
};
export default Topbar;
