"use client";
import PrimaryButton from "@/app/_components/buttons/primary-button";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Image from "next/image";

// useSearchParamsを利用するためにSuspenseでラップする
// https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
export default function SendTransactionPage() {
  return (
    <Suspense>
      <SendTransaction />
    </Suspense>
  );
}

function SendTransaction() {
  const router = useRouter();
  const routerParams = useSearchParams();
  const address = routerParams.get("address");

  const [isSendAmount, setIsSendAmount] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const [isTransactionComplete, setIsTransactionComplete] = useState(false);

  /**
   * 送金処理
   */
  const onSendTransaction = async () => {
    setIsLoading(true);
    // 送金処理
    setIsLoading(false);
    setIsTransactionComplete(true);
  };

  /**
   * 送金処理完了後、ホームに戻るボタンの処理
   */
  const onBackToHome = () => {
    router.push("/");
  };

  return (
    <div
      className={
        isTransactionComplete
          ? "fix h-screen bg-gradient-to-b from-[#1D924D] via-white"
          : "fix h-screen bg-gradient-to-b from-[#FF4A4A] via-white"
      }
    >
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
        {isTransactionComplete && (
          <Image
            width="40"
            height="40"
            src={"/transaction-complete.png"}
            alt="transaction-complete-icon"
          />
        )}
      </div>
      <div className="mt-32 flex justify-center items-center flex-col">
        <div className="font-bold text-2xl  mb-4">
          {isTransactionComplete
            ? "You have successfully sent! "
            : "Enter amount"}
        </div>
        <div className="text-2xl">
          <span>¥ </span>
          <input
            className="appearance-none bg-transparent border-none text-gray-700 leading-tight focus:outline-none text-2xl text-right"
            type="number"
            value={isSendAmount}
            placeholder="100"
            onChange={(e) => setIsSendAmount(Number(e.target.value))}
            disabled={isTransactionComplete || isLoading}
          />
        </div>

        <div className="mt-10 mb-4">to</div>
        <div className="font-bold">{address}</div>
        {/* 送金、ホームに戻るボタン */}
        <div className="fixed z-50 bottom-10">
          {isTransactionComplete ? (
            <PrimaryButton
              buttonLabel="Back to Home"
              onClick={() => onBackToHome()}
              isLoading={false}
            />
          ) : (
            <PrimaryButton
              buttonLabel="Send"
              onClick={() => onSendTransaction()}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}
