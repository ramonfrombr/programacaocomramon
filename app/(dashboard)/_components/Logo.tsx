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
                height={50}
                width={50}
                alt="logo"
                src="/logo.svg"
                className="rounded-full border border-sky-400 mr-2"
            />
            <span
                className={`${luckyiest_guy.className} text-sky-700 text-xl text-center`}
            >
                Code with Ramon
            </span>
        </div>
    );
};
