import Image from "next/image";

export default function WalletAddressField({ address }: { address: string }) {
  return (
    <form className="w-full max-w-sm">
      <div className="flex items-center border-b border-teal-500 py-2">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          value={address}
          placeholder="例: test.zkpayuser.eth"
        />
        <div className="cursor-pointer hover:scale-110 transform transition duration-500 ease-in-out">
          <Image
            width="40"
            height="40"
            src={"/mage_qr-code.png"}
            alt="qr_icon"
          ></Image>
        </div>
      </div>
    </form>
  );
}
