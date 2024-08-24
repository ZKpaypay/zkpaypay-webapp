import { QRCodeCanvas } from "qrcode.react";

export default function QrCodeViewer({ address }: { address: string }) {
  return (
    <div className="p-8 bg-white">
      <QRCodeCanvas
        value={address}
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
