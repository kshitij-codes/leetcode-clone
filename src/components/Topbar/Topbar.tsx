import Image from "next/image";
import Link from "next/link";
import React from "react";

type TopbarProps = {};

const Topbar: React.FC<TopbarProps> = () => {
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

          <Link href="/auth">
            <button className="cursor-pointer rounded bg-dark-fill-3 px-2 py-1 ">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Topbar;
