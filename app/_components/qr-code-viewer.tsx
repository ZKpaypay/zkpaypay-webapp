import { QRCodeCanvas } from "qrcode.react";

export default function QrCodeViewer({ address }: { address: string }) {
  return (
    <QRCodeCanvas
      value={address}
      style={{ width: "100%", height: "100%" }}
    ></QRCodeCanvas>
  );
}
