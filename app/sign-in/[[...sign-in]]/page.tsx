import { SignIn } from "@clerk/nextjs";
import BrandLogo from "@/components/common/BrandLogo";
import { clerkAppearance } from "@/constants/authTheme";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4" style={{ backgroundColor: "#171717" }}>
      <div className="mb-6 text-center flex flex-col items-center">
        <BrandLogo size="xl" showText className="mb-3" />
        <p className="text-sm mt-2" style={{ color: "#a8a29e" }}>
          សូមចូលប្រើប្រាស់គណនីរបស់អ្នក · Sign in to your account
        </p>
      </div>
      <SignIn
        appearance={clerkAppearance}
        fallbackRedirectUrl="/"
        signUpUrl="/sign-up"
      />
    </div>
  );
}
