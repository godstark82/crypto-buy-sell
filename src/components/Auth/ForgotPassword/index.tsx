"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Loader from "@/components/Common/Loader";
import { auth } from "@/firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    setLoader(true);

    try {
      // ✅ Firebase sends password reset email
      await sendPasswordResetEmail(auth, email.toLowerCase());
      toast.success("Password reset email sent! Check your inbox.");
      setEmail("");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong.");
    } finally {
      setLoader(false);
    }
  };


  return (
    <section className="bg-[#F4F7FF] py-14 dark:bg-dark lg:py-20">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white px-8 py-14 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]"
              data-wow-delay=".15s"
            >
              <div className="mb-10 text-center">
                <Link href="/" className="mx-auto inline-block max-w-[160px]">
                  <Image
                    src= "/images/logo/logo.svg"
                    alt="logo"
                    width={140}
                    height={30}
                    className="dark:hidden"
                  />
                  <Image
                    src= "/images/logo/logo-white.svg"
                    alt="logo"
                    width={140}
                    height={30}
                    className="hidden dark:block"
                  />
                </Link>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-[22px]">
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="">
                  <button
                  disabled={loader}
                    type="submit"
                    className="flex w-full cursor-pointer items-center justify-center rounded-md border border-primary bg-primary px-5 py-3 text-base text-white transition duration-300 ease-in-out hover:bg-blue-dark"
                  >
                    Send Email {loader && <Loader />}
                  </button>
                </div>
              </form>

              <div>
                <span className="absolute right-1 top-1">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
