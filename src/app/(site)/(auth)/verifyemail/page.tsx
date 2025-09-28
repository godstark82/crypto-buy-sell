import SignUp from "@/components/Auth/SignUp";
import VerifyEmail from "@/components/Auth/VerifyEmail";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Verify Your Email",
};

const VerifyEmailPage = () => {
  return (
    <>
      <Breadcrumb pageName="Verification Page" />

      <VerifyEmail />
    </>
  );
};

export default VerifyEmailPage;
