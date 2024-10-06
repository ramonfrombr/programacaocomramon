import React from "react";

const ContactPage = () => {
  return (
    <div className="p-8 md:px-32 lg:px-52 ">
      <h1 className="text-2xl font-semibold mb-3">Entre em contato conosco</h1>

      <p className="mb-8 text-gray-500">
        Por favor, entre em contato e um representante irá acompanhá-lo
        pessoalmente assim que possível. Considere que você pode experimentar um
        atraso na resposta devido a feriados, finais de semana ou outras
        circunstâncias.
      </p>

      <h2 className="text-2xl mb-3">Informações de Contato</h2>

      <p className="mb-3">
        Para suporte relacionado à sua conta, envio de bugs ou perguntas sobre
        nosso conteúdo.
      </p>

      <ul className="pl-10 list-disc">
        <li>Segunda a sexta-feira, das 9h às 17h</li>
        <li>
          Respondemos dentro de 48 horas úteis para solicitações de suporte
        </li>
        <li>programacaocomramon@gmail.com</li>
      </ul>
    </div>
  );
};

export default ContactPage;
