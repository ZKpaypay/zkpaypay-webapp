import { useEnsAddress } from "wagmi";
import { normalize } from "viem/ens";

export default function NameLookup() {
  const result = useEnsAddress({
    name: normalize("nick.eth"),
  });

  return <div>ドメイン名は？{result.data}</div>;
}
