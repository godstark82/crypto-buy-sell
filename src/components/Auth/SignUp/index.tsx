"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SocialSignUp from "../SocialSignUp";
import Logo from "@/components/Layout/Header/Logo";
import { useState } from "react";
import Loader from "@/components/Common/Loader";
import { auth } from "@/firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";


const SignUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData(e.currentTarget);
    const { name, email, password } = Object.fromEntries(data.entries()) as {
      name: string;
      email: string;
      password: string;
    };

    if (!name || !email || !password) {
      toast.error("Please fill all fields.");
      setLoading(false);
      return;
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Update user profile with display name
      await updateProfile(userCredential.user, { displayName: name });

      toast.success("Successfully registered!");
      setLoading(false);
      router.push("/signin"); // Redirect to SignIn page
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Registration failed.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-10 text-center mx-auto inline-block max-w-[160px]">
        <Logo />
      </div>

      {/* Google SignUp button */}
      <SocialSignUp />

      <span className="z-1 relative my-8 block text-center before:content-[''] before:absolute before:h-px before:w-40% before:bg-dark_border before:bg-opacity-60 before:left-0 before:top-3 after:content-[''] after:absolute after:h-px after:w-40% after:bg-dark_border after:bg-opacity-60 after:top-3 after:right-0">
        <span className="text-body-secondary relative z-10 inline-block px-3 text-base text-white">
          OR
        </span>
      </span>

      <form onSubmit={handleSubmit}>
        <div className="mb-[22px]">
          <input
            type="text"
            placeholder="Name"
            name="name"
            required
            className="w-full rounded-md border border-dark_border border-opacity-60 bg-transparent px-5 py-3 text-base text-white outline-none transition placeholder:text-grey focus:border-primary"
          />
        </div>
        <div className="mb-[22px]">
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            className="w-full rounded-md border border-dark_border border-opacity-60 bg-transparent px-5 py-3 text-base text-white outline-none transition placeholder:text-grey focus:border-primary"
          />
        </div>
        <div className="mb-[22px]">
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            className="w-full rounded-md border border-dark_border border-opacity-60 bg-transparent px-5 py-3 text-base text-white outline-none transition placeholder:text-grey focus:border-primary"
          />
        </div>
        <div className="mb-9">
          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center items-center text-18 font-medium rounded-md bg-primary px-5 py-3 border border-primary hover:bg-transparent hover:text-primary transition duration-300"
          >
            {loading ? <Loader /> : "Sign Up"}
          </button>
        </div>
      </form>

      <p className="text-body-secondary mb-4 text-white text-base">
        By creating an account you agree with our{" "}
        <a href="/#" className="text-primary hover:underline">
          Privacy
        </a>{" "}
        and{" "}
        <a href="/#" className="text-primary hover:underline">
          Policy
        </a>
      </p>

      <p className="text-body-secondary text-white text-base">
        Already have an account?
        <Link href="/signin" className="pl-2 text-primary hover:underline">
          Sign In
        </Link>
      </p>
    </>
  );
};

export default SignUp;
