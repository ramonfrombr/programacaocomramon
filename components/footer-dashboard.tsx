import Link from "next/link";

const footerLinks = [
  { text: "Sobre", url: "/about" },
  { text: "Perguntas Frequentes", url: "/faqs" },
  { text: "Contato", url: "/contact" },
  { text: "Termos de Uso", url: "/terms-of-use" },
  { text: "Política de Privacidade", url: "/privacy-policy" },
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

      <p className="px-5 lg:text-center text-sm py-3 text-slate-500">
        &copy; Programação com Ramon
      </p>
    </footer>
  );
};
