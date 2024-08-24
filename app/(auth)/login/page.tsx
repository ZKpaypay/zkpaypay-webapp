import LoginHeader from "../../_components/login-header";
import "@rainbow-me/rainbowkit/styles.css";
import LoginButton from "@/app/_components/login-button";
import LoginPageTitle from "@/app/_components/login-page-title";

export default function Page() {
  return (
    <div>
      <div className="mb-4">
        <LoginHeader></LoginHeader>
      </div>
      <div className="text-4xl font-normal leading-[36px] text-left text-[#0027F3]">
        ZKpaypay
      </div>
      <div className="min-h-[70vh] flex justify-center items-center flex-col">
        <div className="mb-4">
          <LoginPageTitle title={"Connect your wallet"}></LoginPageTitle>
        </div>
        <div>
          <LoginButton />
        </div>
      </div>
    </div>
  );
}
