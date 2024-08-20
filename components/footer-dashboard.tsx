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
    <footer className="w-full mt-10 flex flex-col lg:items-center justify-between border-t lg:p-2 bg-white pt-3">
      <div className="flex flex-wrap flex-row md:border-0 md:gap-2 text-blue-400 text-xs md:text-sm">
        {footerLinks.map((link) => (
          <Link
            key={link.text}
            href={link.url}
            className="px-5 py-2 lg:border-0"
          >
            {link.text}
          </Link>
        ))}
      </div>

      <p className="text-center text-sm py-3 text-slate-500">
        &copy; Programação com Ramon
      </p>
    </footer>
  );
};
