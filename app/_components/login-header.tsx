import Image from "next/image";
import logoIcon from "../public/icon.png";

export default function LoginHeader() {
  return (
    <div>
      <Image width="96" height="96" src={"/icon.png"} alt="logo" />
    </div>
  );
}
