"use client";

import { useAccount } from "wagmi";
import WalletAddressField from "../components/wallet-address-field";
import MoneyComponent from "../components/typography/money";
import TxRecordRow from "../components/tx-record-row";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface TxRecord {
  transactionSubDomain: string;
  date: string;
  amount: number;
  isSenderIsLoginUser: boolean; // 送信者がログインユーザーかどうか
}

function Page() {
  const [subDomain, setSubDomain] = useState("");
  const [txRecords, setTxRecords] = useState<TxRecord[]>([]);

  const account = useAccount();
  const supabase = createClient();
  const balance = 1000;

  // isConnectedがfalseの時/loginのページにリダイレクト
  const router = useRouter();
  if (!account.isConnected) {
    router.push("/login");
  }

  useEffect(() => {
    supabase
      .from("accounts")
      .select("*")
      .eq("wallet_address", account.address!)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setSubDomain(response.data[0].sub_domain!);
        } else {
          // アカウントが作成されていない場合は/create-domainにリダイレクト
          router.push("/create-domain");
        }
      });
  }, [account]);

  useEffect(() => {
    supabase
      .from("transaction_logs")
      .select("*")
      .or(
        `sender_sub_domain.eq.${subDomain},receiver_sub_domain.eq.${subDomain}`
      )
      .then((response) => {
        if (response.data && response.data.length > 0) {
          const _txRecords = response.data.map((data) => {
            const isSenderIsLoginUser = data.sender_sub_domain === subDomain;
            const transactionSubDomain = isSenderIsLoginUser // やりとりをした相手のサブドメイン
              ? data.receiver_sub_domain
              : data.sender_sub_domain;
            return {
              transactionSubDomain: transactionSubDomain,
              date: data.created_at,
              amount: data.amount,
              isSenderIsLoginUser,
            } as TxRecord;
          }) as TxRecord[];
          setTxRecords(_txRecords);
        }
      });
  }, [account]);

  return (
    <>
      <div className="mt-32 flex justify-center items-center flex-col">
        <div className="min-w-[400px]">
          <WalletAddressField address={subDomain} />
          {/* 残高表示エリア */}
          <div className="mt-4">
            <p>S-JPY Balance</p>
            <div className="flex justify-end">
              <MoneyComponent balance={balance} />
            </div>
            <hr className="mt-2" />
          </div>
          {/* 決済履歴表示エリア */}
          <div className="mt-12">
            <h2 className="text-l font-bold">Tx Record</h2>
            {txRecords.map((txRecord, index) => (
              <TxRecordRow
                key={index}
                transactionSubDomain={txRecord.transactionSubDomain}
                date={txRecord.date}
                amount={txRecord.amount}
                isSenderIsLoginUser={txRecord.isSenderIsLoginUser}
              />
            ))}
          </div>
        </div>
        <Link
          href="/scan-qr"
          className="fixed z-1 bottom-10 right-8 p-4
  border-2 bg-[#0027F3] rounded-full cursor-pointer hover:scale-110 transform transition duration-500 ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            color="white"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </Link>
      </div>
    </>
  );
}

export default Page;
