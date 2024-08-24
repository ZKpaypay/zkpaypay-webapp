import { QRCodeCanvas } from "qrcode.react";

export default function QrCodeViewer({
  address,
  secretKey,
}: {
  address: string;
  secretKey: string;
}) {
  const qrCodeValue = `${address},${secretKey}`;
  return (
    <div className="p-8 bg-white">
      <QRCodeCanvas
        value={qrCodeValue}
        style={{
          width: "50vw",
          height: "50vw",
          maxWidth: "400px",
          maxHeight: "400px",
        }}
      ></QRCodeCanvas>
    </div>
  );
}
