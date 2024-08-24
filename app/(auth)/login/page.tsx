import LoginHeader from "../../_components/login-header";
import "@rainbow-me/rainbowkit/styles.css";
import LoginButton from "@/app/_components/login-button";

export default function Page() {
  return (
    <div>
      <div className="mb-4">
        <LoginHeader></LoginHeader>
      </div>
      <div className="text-4xl font-normal leading-[36px] text-left text-[#0027F3]">
        ZKPay
      </div>
      <div className="min-h-[70vh] flex justify-center items-center flex-col">
        <div className="mb-4">
          <span className="text-[#0027F3]">Connect your wallet</span>
        </div>
        <div>
          <LoginButton />
        </div>
      </div>
    </div>
  );
}
