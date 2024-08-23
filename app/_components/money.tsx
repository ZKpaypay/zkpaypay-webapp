export default function MoneyComponent({
  balance,
}: {
  balance: number | undefined;
}) {
  function formatMoney(balance: number | undefined) {
    if (balance === undefined) {
      return "0";
    }
    return balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="text-4xl">
      <span className="mr-2">¥</span>
      {formatMoney(balance)}
    </div>
  );
}
