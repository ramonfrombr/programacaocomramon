import Image from "next/image";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center">
        <Image height={40} width={40} alt="logo" src="/logo.png" />

        <div className="ml-3">
          <p
            className={`leading-5 font-semibold text-base text-sky-900 ${poppins.className}`}
          >
            Programação Com Ramon
          </p>

          <p className="text-sm text-muted-foreground">
            Construa algo incrível!
          </p>
        </div>
      </div>
    </Link>
  );
};
