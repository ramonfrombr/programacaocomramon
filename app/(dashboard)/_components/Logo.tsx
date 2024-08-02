import Image from "next/image";
import { Luckiest_Guy } from "next/font/google";

const luckyiest_guy = Luckiest_Guy({
  subsets: ["latin"],
  weight: "400",
});

export const Logo = () => {
  return (
    <div className="flex items-center">
      <Image height={40} width={40} alt="logo" src="/logo.png" />
      <p
        className={`ml-3 leading-5 font-bold text-xl text-sky-700 ${luckyiest_guy.className}`}
      >
        Programação <br /> com Ramon
      </p>
    </div>
  );
};
