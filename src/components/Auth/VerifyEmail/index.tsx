import { FaEnvelopeOpenText } from "react-icons/fa";

const VerifyEmail = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-900 rounded-lg shadow-lg p-8">
        <FaEnvelopeOpenText className="text-5xl text-blue-400 mb-6" />
        <h1 className="text-3xl font-bold mb-3 text-white">Verify Your Email</h1>
        <p className="text-lg text-gray-300 mb-6 max-w-md text-center">
            We’ve sent a verification link to your email address. Please check your inbox and click the link to continue.
        </p>
        <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-400">
                Didn’t receive the email? Check your spam folder or&nbsp;
                <button className="text-blue-400 underline hover:text-blue-300 transition-colors" type="button">
                    Resend Email
                </button>
            </span>
        </div>
    </div>
);

export default VerifyEmail;
