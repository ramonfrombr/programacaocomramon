import Image from "next/image";
import { Luckiest_Guy } from "next/font/google";

const luckyiest_guy = Luckiest_Guy({
  subsets: ["latin"],
  weight: "400",
});

export const Logo = () => {
  return (
    <div className="flex items-center">
      <Image
        height={100}
        width={170}
        alt="logo"
        src="/logo-programacao-com-ramon.jpg"
        className=""
      />
    </div>
  );
};
