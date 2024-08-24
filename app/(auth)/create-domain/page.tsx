"use client";
import "@rainbow-me/rainbowkit/styles.css";
import { createClient } from "@/utils/supabase/client";
import LoginHeader from "@/app/_components/login-header";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateDomainPage() {
  const [isFirstLogin, setIsFirstLogin] = useState(false);
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
          setIsFirstLogin(true);
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
        ZKPay
      </div>
      <div className="min-h-[50vh] flex justify-center items-center flex-col">
        <div className="mb-12 justify-start">
          <span className="text-2xl font-bold leading-[36px] text-left ">
            Request your
          </span>
          <br />
          <span className="text-2xl font-bold leading-[36px] text-left ">
            ENS Sub-domain
          </span>
        </div>

        <div>
          {isFirstLogin ? (
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
                <button
                  type="button"
                  className=" w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  onClick={onClickRegister}
                >
                  {isLoading ? (
                    <>
                      <svg
                        aria-hidden="true"
                        role="status"
                        className="inline w-4 h-4 me-3 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>
                      Loading...
                    </>
                  ) : (
                    "Request"
                  )}
                </button>
              </div>
            </div>
          ) : (
            <span>Loading...</span>
          )}
        </div>
      </div>
    </div>
  );
}
