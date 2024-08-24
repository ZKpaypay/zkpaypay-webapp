import LoginHeader from "../../components/login-header";
import "@rainbow-me/rainbowkit/styles.css";
import LoginButton from "@/app/components/buttons/login-button";
import LoginPageTitle from "@/app/components/typography/login-page-title";

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
          <LoginPageTitle title={"Connect your wallet"} />
        </div>
        <div>
          <LoginButton />
        </div>
      </div>
    </div>
  );
}
