import { Providers } from "@/utils/providers";
import LoginHeader from "../../_components/login-header";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

export default function Page() {
  return (
    <div>
      <div className="mb-4">
        <LoginHeader></LoginHeader>
      </div>
      <h1 className="text-4xl font-normal leading-[36px] text-left text-[#0027F3]">
        ZKPay
      </h1>
      <div className="min-h-[70vh] flex justify-center items-center flex-col">
        <div className="mb-4">
          <span className="text-[#0027F3]">Connect your wallet</span>
        </div>
        <div>
          <Providers>
            <ConnectButton />
          </Providers>
        </div>
      </div>
    </div>
  );
}
