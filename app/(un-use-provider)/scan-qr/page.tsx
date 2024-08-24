"use client";
import QrCodeReader from "@/app/_components/qr-code-reader";
import { useRouter } from "next/navigation";

export default function ScanQr() {
  const router = useRouter();
  const onQRReadCompleteButton = (address: string) => {
    router.push(`/send-transaction?address=${address}`);
  };

  return <QrCodeReader onQRReadCompleteButton={onQRReadCompleteButton} />;
}
