import { SignUp } from "@clerk/nextjs";
import BrandLogo from "@/components/common/BrandLogo";
import { clerkAppearance } from "@/constants/authTheme";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4" style={{ backgroundColor: "#171717" }}>
      <div className="mb-6 text-center">
        <BrandLogo size="lg" className="mx-auto mb-3" />
        <h1 className="text-xl font-bold" style={{ color: "#fafaf9" }}>
          M23 Cashew Advisor
        </h1>
        <p className="text-sm mt-1" style={{ color: "#a8a29e" }}>
          បង្កើតគណនីថ្មីរបស់អ្នក · Create your account
        </p>
      </div>
      <SignUp
        appearance={clerkAppearance}
        fallbackRedirectUrl="/"
        signInUrl="/sign-in"
      />
    </div>
  );
}
