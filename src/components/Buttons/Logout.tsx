import { auth } from "@/firebase/firebase";
import React from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import { FiLogOut } from "react-icons/fi";

const Logout: React.FC = () => {
  const [signOut, loading, error] = useSignOut(auth);

  const handleLogout = () => {
    signOut();
  };

  return (
    <button
      className="cursor-pointer rounded bg-dark-fill-3 px-3 py-1.5 text-brand-orange"
      onClick={handleLogout}
    >
      <FiLogOut />
    </button>
  );
};
export default Logout;
