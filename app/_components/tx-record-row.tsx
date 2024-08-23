export default function TxRecordRow({
  senderAddress,
  date,
  amount,
}: {
  senderAddress: string;
  date: string;
  amount: number;
}) {
  function formatMoney(balance: number | undefined) {
    if (balance === undefined) {
      return "0";
    }
    return balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <>
      <div className="flex flex-row justify-between my-2">
        <div className="flex flex-col">
          <div className="text-sm">{senderAddress}</div>
          <div className="text-sm gray">{date}</div>
        </div>
        <div className="flex items-center justify-end w-[120px] text-l bg-pink-100 text-pink-800 font-medium me-2 px-2.5 py-0.5 rounded-xl dark:bg-pink-900 dark:text-pink-300">
          <span className="mr-1">¥</span>
          {formatMoney(amount)}
        </div>
      </div>
      <hr className="mt-2" />
    </>
  );
}
