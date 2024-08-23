"use client";
import { useState } from "react";

function Page() {
  // textのinputの値を取得
  const [contractAddress, setContractAddress] = useState(
    "0x3db5bb7de1e85fabef286cc03c8a46787d60d98c" as `0x${string}`
  );

  return (
    <div>
      <div className="flex justify-center">
        <h1>zkppay</h1>
      </div>
    </div>
  );
}

export default Page;
