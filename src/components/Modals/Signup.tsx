import { authModalState } from "@/atoms/authModalAtom";
import { auth, firestore } from "@/firebase/firebase";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";

type SignupProps = {};

const Signup: React.FC<SignupProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  const handleClick = () => {
    setAuthModalState((prev) => ({ ...prev, type: "login" }));
  };

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const router = useRouter();

  const [inputs, setInputs] = useState({
    email: "",
    displayName: "",
    password: "",
  });

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password || !inputs.displayName) {
      return toast.error("Please fill all fields", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    }
    try {
      toast.loading("Creating your account", {
        position: "top-center",
        toastId: "loadingToast",
        theme: "dark",
      });
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password,
      );
      if (!newUser) return;
      const userData = {
        uid: newUser.user.uid,
        email: newUser.user.email,
        displayName: inputs.displayName,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        likedProblems: [],
        dislikedProblems: [],
        solvedProblems: [],
        starredProblems: [],
      };
      await setDoc(doc(firestore, "users", newUser.user.uid), userData);
      router.push("/");
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    } finally {
      toast.dismiss("loadingToast");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    }
  }, [error]);

  return (
    <>
      <form className="space-y-6 px-6 pb-4" onSubmit={handleRegister}>
        <h3 className="text-xl font-medium text-white">Register to Leetcode</h3>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Email
          </label>
          <input
            onChange={handleChangeInput}
            type="email"
            name="email"
            id="email"
            className="block w-full rounded-lg border-2 border-gray-500 bg-gray-600 p-2.5 text-white placeholder-gray-400
          outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="john@gmail.com"
          />
        </div>
        <div>
          <label
            htmlFor="displayName"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Display name
          </label>
          <input
            onChange={handleChangeInput}
            type="displayName"
            name="displayName"
            id="displayName"
            className="block w-full rounded-lg border-2 border-gray-500 bg-gray-600 p-2.5 text-white placeholder-gray-400
          outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Password
          </label>
          <input
            onChange={handleChangeInput}
            type="password"
            name="password"
            id="password"
            className="block w-full rounded-lg border-2 border-gray-500 bg-gray-600 p-2.5 text-white placeholder-gray-400
          outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="**********"
          />
        </div>
        <button
          type="submit"
          className="p w-full rounded-lg bg-brand-orange px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-brand-orange-s focus:ring-blue-300"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <div className="text-sm font-medium text-gray-300">
          Already have an account?{" "}
          <a
            href="#"
            className="text-blue-700 hover:underline"
            onClick={handleClick}
          >
            Login
          </a>
        </div>
      </form>
    </>
  );
};
export default Signup;
