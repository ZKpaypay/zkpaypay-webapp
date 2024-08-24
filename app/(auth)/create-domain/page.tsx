"use client";
import "@rainbow-me/rainbowkit/styles.css";
import { createClient } from "@/utils/supabase/client";
import LoginHeader from "@/app/_components/login-header";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginPageTitle from "@/app/_components/login-page-title";
import PrimaryButton from "@/app/_components/buttons/primary-button";

export default function CreateDomainPage() {
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [subDomain, setSubDomain] = useState("");

  const account = useAccount();
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    supabase
      .from("accounts")
      .select("*")
      .eq("wallet_address", account.address!)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setSubDomain(response.data[0].sub_domain!);

          // アカウント作成済みの時は/のページにリダイレクト
          router.push("/");
        } else {
          // ローディング状態を終了し、サブドメインを入力するフォームを表示
          setIsFirstLogin(true);
          setIsFirstLoading(false);
        }
      });
  }, []);

  const onSubDomainChange = (value: string) => {
    setSubDomain(value);
  };

  const [isLoading, setIsLoading] = useState(false);
  const onClickRegister = async () => {
    setIsLoading(true);
    const fullSubDomain = `${subDomain}.zkpaypay.eth`;
    await supabase.from("accounts").insert([
      {
        wallet_address: account.address,
        sub_domain: fullSubDomain,
      },
    ]);

    router.push("/");
  };

  return (
    <div>
      <div className="mb-4">
        <LoginHeader></LoginHeader>
      </div>
      <div className="text-4xl font-normal leading-[36px] text-left text-[#0027F3]">
        ZKpaypay
      </div>
      <div className="min-h-[50vh] flex justify-center items-center flex-col">
        <div className="mb-12 justify-start">
          <LoginPageTitle
            title={
              isFirstLoading
                ? "Checking Account..."
                : "Request your ENS Sub-domain"
            }
          ></LoginPageTitle>
        </div>

        <div>
          {/* 初回ログイン時のサブドメイン登録フォーム */}
          {isFirstLogin && (
            <div>
              <div className="flex items-center border-b border-teal-500 py-2">
                <input
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  value={subDomain}
                  placeholder="input your sub domain"
                  onChange={(e) => onSubDomainChange(e.target.value)}
                />
                <span>.zkpaypay.eth</span>
              </div>

              <div className="flex justify-center mt-12">
                <PrimaryButton
                  buttonLabel="Request"
                  onClick={onClickRegister}
                  disabled={isLoading}
                  isLoading={isLoading}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
