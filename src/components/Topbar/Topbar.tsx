import { auth } from "@/firebase/firebase";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Logout from "../Buttons/Logout";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BsList } from "react-icons/bs";
import Timer from "../Timer/Timer";
import { problems } from "@/utils/problems";
import { useRouter } from "next/router";
import { Problem } from "@/utils/types/problem";

type TopbarProps = {
  problemPage?: boolean;
};

const Topbar: React.FC<TopbarProps> = ({ problemPage }) => {
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);

  const router = useRouter();

  const handleProblemChange = (isForward: boolean) => {
    const { order } = problems[router.query.pid as string] as Problem;
    const direction = isForward ? 1 : -1;
    const nextProblemOrder = order + direction;
    const nextProblemKey = Object.keys(problems).find(
      (key) => problems[key].order === nextProblemOrder,
    );
    if (isForward && !nextProblemKey) {
      const firstProblemKey = Object.keys(problems).find(
        (key) => problems[key].order === 1,
      );
      router.push(`/problems/${firstProblemKey}`);
    } else if (!isForward && !nextProblemKey) {
      const lastProblemKey = Object.keys(problems).find(
        (key) => problems[key].order === Object.keys(problems).length,
      );
      router.push(`/problems/${lastProblemKey}`);
    } else {
      router.push(`/problems/${nextProblemKey}`);
    }
  };

  return (
    <nav className="relative flex h-[50px] w-full shrink-0 items-center justify-between bg-dark-layer-1 px-5 text-dark-gray-7">
      <div className={`mx-4 flex w-full items-center justify-between`}>
        <Link href="/" className="h-[22px] flex-1">
          <Image src="/logo-full.png" alt="Logo" height={100} width={100} />
        </Link>

        {problemPage && (
          <div className="flex flex-1 items-center justify-center gap-4">
            <div
              onClick={() => handleProblemChange(false)}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2"
            >
              <FiChevronLeft />
            </div>
            <Link
              href="/"
              className="max-w font-medium-[170px] flex cursor-pointer items-center gap-2 text-dark-gray-8"
            >
              <div>
                <BsList />
              </div>
              <p>Problem List</p>
            </Link>
            <div
              onClick={() => handleProblemChange(true)}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2"
            >
              <FiChevronRight />
            </div>
          </div>
        )}

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
          {user && problemPage && <Timer />}

          {user && (
            <div className="group relative cursor-pointer">
              <Image
                src="/avatar.png"
                alt="user profile"
                className="rounded-full"
                width={30}
                height={30}
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
