"use client";
import PrimaryButton from "@/app/components/buttons/primary-button";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, use, useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { useAccount } from "wagmi";

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
  const account = useAccount();
  const router = useRouter();
  const routerParams = useSearchParams();
  const receiverSubDomain = routerParams.get("address");
  const secretKey = routerParams.get("secretKey");
  const supabase = createClient();

  const [senderSubDomain, setSenderSubDomain] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [sendAmount, setSendAmount] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const [isTransactionComplete, setIsTransactionComplete] = useState(false);

  useEffect(() => {
    // 送信者（自分）のENSドメインを取得
    supabase
      .from("accounts")
      .select("sub_domain")
      .eq("wallet_address", account.address!)
      .single()
      .then((response) => {
        if (response.data) {
          setSenderSubDomain(response.data.sub_domain || "");
        }
      });
  }, [receiverSubDomain]);

  useEffect(() => {
    // 受信者（送信相手）のウォレットアドレスを取得
    supabase
      .from("accounts")
      .select("wallet_address")
      .eq("sub_domain", receiverSubDomain!)
      .single()
      .then((response) => {
        if (response.data) {
          setReceiverAddress(response.data.wallet_address || "");
        }
      });
  }, [receiverSubDomain]);

  /**
   * 送金処理
   */
  const onSendTransaction = async () => {
    setIsLoading(true);
    // 送金処理
    await supabase.from("transaction_logs").insert([
      {
        sender_sub_domain: senderSubDomain,
        receiver_sub_domain: receiverSubDomain,
        amount: sendAmount,
      },
    ]);

    // TODO: ここにコントラクトの実行処理を追加
    console.log("Send Transaction", receiverAddress, secretKey);

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
            value={sendAmount}
            placeholder="100"
            onChange={(e) => setSendAmount(Number(e.target.value))}
            disabled={isTransactionComplete || isLoading}
          />
        </div>

        <div className="mt-10 mb-4">to</div>
        <div className="font-bold">{receiverSubDomain}</div>
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
