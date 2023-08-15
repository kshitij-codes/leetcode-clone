import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import Login from "./Login";
import Signup from "./Signup";
import ResetPassword from "./ResetPassword";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";

type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
  const authModal = useRecoilValue(authModalState);

  const setAuthModalState = useSetRecoilState(authModalState);

  const handleClose = () => {
    setAuthModalState((prev) => ({ ...prev, isOpen: false, type: "login" }));
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-60"></div>
      <div className="absolute left-[50%]  top-[50%] flex w-full translate-x-[-50%] translate-y-[-50%]  items-center justify-center sm:w-[450px]">
        <div className="relative mx-auto flex h-full w-full items-center justify-center">
          <div className="relative mx-6 w-full rounded-lg bg-white bg-gradient-to-b from-brand-orange to-slate-900 shadow">
            <div className="flex justify-end p-2">
              <button
                type="button"
                onClick={handleClose}
                className="ml-auto  inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-white hover:bg-gray-800 hover:text-white"
              >
                <IoClose className="h-5 w-5" />
              </button>
            </div>
            {authModal.type === "login" ? (
              <Login />
            ) : authModal.type === "register" ? (
              <Signup />
            ) : (
              <ResetPassword />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default AuthModal;
