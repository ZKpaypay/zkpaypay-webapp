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
      </div>
    </form>
  );
}
