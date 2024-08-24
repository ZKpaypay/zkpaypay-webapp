"use client";
import QrCodeReader from "@/app/components/qr-code/qr-code-reader";
import { useRouter } from "next/navigation";

export default function ScanQr() {
  const router = useRouter();
  const onQRReadCompleteButton = (qrData: string) => {
    // 送金先のアドレス,SecretKeyなので分割
    const [address, secretKey] = qrData.split(",");
    router.push(`/send-transaction?address=${address}&secretKey=${secretKey}`);
  };

  return <QrCodeReader onQRReadCompleteButton={onQRReadCompleteButton} />;
}
