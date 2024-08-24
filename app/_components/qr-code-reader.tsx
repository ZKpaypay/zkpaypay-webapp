"use client";
import jsQR from "jsqr";
import React, { useRef, useState, useEffect, FC } from "react";
import SecondaryButton from "./buttons/secondary-button";
import PrimaryButton from "./buttons/primary-button";

export default function QrCodeReader({
  onQRReadCompleteButton,
}: {
  onQRReadCompleteButton: (address: string) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const constraints = {
      video: {
        facingMode: "environment",
      },
    };

    // デバイスのカメラにアクセスする
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        // デバイスのカメラにアクセスすることに成功したら、video要素にストリームをセットする
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          scanQrCode();
        }
      })
      .catch((err) => console.error("Error accessing media devices:", err));

    const currentVideoRef = videoRef.current;

    // コンポーネントがアンマウントされたら、カメラのストリームを停止する
    return () => {
      if (currentVideoRef && currentVideoRef.srcObject) {
        const stream = currentVideoRef.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const scanQrCode = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // カメラの映像をcanvasに描画する
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        // QRコードをスキャンする
        const qrCodeData = jsQR(
          imageData.data,
          imageData.width,
          imageData.height
        );
        if (qrCodeData) {
          // スキャンされた内容を確認する
          onQRReadCompleteButton(qrCodeData.data);
          return;
        }
        setTimeout(scanQrCode, 100);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="relative h-screen w-screen">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="absolute left-0 top-0 -z-50"
          />
          <canvas
            ref={canvasRef}
            className="absolute left-0 top-0 h-full w-full"
          />
        </div>
      </div>
      {error && <p className="text-center text-xs text-red-500">{error}</p>}
    </div>
  );
}
