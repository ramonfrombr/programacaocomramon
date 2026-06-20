import Image from "next/image";
import AmazonLogo from "@/public/companies/logo-amazon.png";
import AppleLogo from "@/public/companies/logo-apple.png";
import GloboLogo from "@/public/companies/logo-globo.png";
import GoogleLogo from "@/public/companies/logo-google.png";
import IFoodLogo from "@/public/companies/logo-ifood.png";
import InstagramLogo from "@/public/companies/logo-instagram.png";
import MercadoLivreLogo from "@/public/companies/logo-mercadolivre.png";
import MetaLogo from "@/public/companies/logo-meta.png";
import MicrosoftLogo from "@/public/companies/logo-microsoft.png";
import NetflixLogo from "@/public/companies/logo-netflix.png";
import NubankLogo from "@/public/companies/logo-nubank.png";
import OBoticarioLogo from "@/public/companies/logo-oboticario.png";
import PicPayLogo from "@/public/companies/logo-picpay.png";
import TeslaLogo from "@/public/companies/logo-tesla.png";

const companyLogos = [
    { name: "Amazon", image: AmazonLogo },
    { name: "Apple", image: AppleLogo },
    { name: "Globo", image: GloboLogo },
    { name: "Google", image: GoogleLogo },
    { name: "iFood", image: IFoodLogo },
    { name: "Instagram", image: InstagramLogo },
    { name: "Mercado Livre", image: MercadoLivreLogo },
    { name: "Meta", image: MetaLogo },
    { name: "Microsoft", image: MicrosoftLogo },
    { name: "Netflix", image: NetflixLogo },
    { name: "Nubank", image: NubankLogo },
    { name: "O Boticário", image: OBoticarioLogo },
    { name: "PicPay", image: PicPayLogo },
    { name: "Tesla", image: TeslaLogo },
] as const;

export function CompanyLogos() {
    return (
        <ul
            aria-label="Companies using these technologies"
            className="flex flex-wrap justify-center items-center gap-6 md:gap-8 mb-12 md:mb-20"
        >
            {companyLogos.map((company) => (
                <li key={company.name}>
                    <Image
                        src={company.image}
                        alt={company.name}
                        width={140}
                        height={56}
                        className="h-8 md:h-10 w-auto object-contain"
                    />
                </li>
            ))}
        </ul>
    );
}
