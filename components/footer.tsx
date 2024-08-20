import Link from "next/link";

const footerLinks = [
  { text: "Sobre", url: "" },
  { text: "Artigos", url: "" },
  { text: "Perguntas Frequentes", url: "" },
  { text: "Contato", url: "" },
  { text: "Termos de Uso", url: "" },
  { text: "Política de Privacidade", url: "" },
];

export const Footer = () => {
  return (
    <footer className="w-full mt-10 lg:flex lg:flex-row lg:items-center justify-between border-t lg:p-5 bg-white">
      <div className="flex flex-col lg:flex-row md:border-0 md:gap-2 text-blue-400 text-xs md:text-sm">
        {footerLinks.map((link) => (
          <Link
            key={link.text}
            href={link.url}
            className="p-5 border-b-[1px] lg:border-0"
          >
            {link.text}
          </Link>
        ))}
      </div>

      <p className="text-center text-sm p-8 lg:p-0 text-slate-500">
        &copy; Programação com Ramon
      </p>
    </footer>
  );
};
