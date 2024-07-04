import React from "react";
import { Luckiest_Guy } from "next/font/google";
import Image from "next/image";
import logoImage from "@/public/logo.jpg";

const luckiestGuy = Luckiest_Guy({ subsets: ["latin"], weight: "400" });

const VideoCard = ({ video }: { video: { id: string; title: string } }) => {
    return (
        <div>
            <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
            >
                <Image
                    src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                    alt=""
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }} // optional
                />

                <h2 className="text-xl font-semibold text-gray-700">
                    {video.title}
                </h2>
            </a>
        </div>
    );
};

const videoList = [
    {
        id: "qTXzemF5IIk",
        title: "Tutorial HTML, CSS, e JavaScript: Lista Ordenável",
    },
    {
        id: "aych3TU6ww4",
        title: "Tutorial de HTML, CSS, e JavaScript: Criando um Gestor de Orçamento",
    },
    {
        id: "dK0V64X2XNQ",
        title: "Criando Caixas com Efeito 3D e Animação com HTML, CSS, e JavaScript",
    },
    {
        id: "7oCSdKeMDkc",
        title: "Projetos com JavaScript: Arrastar e Soltar • Desenvolvimento Web",
    },
    {
        id: "BnvDc5ztbF8",
        title: "Projetos com JavaScript: Gerador de Senhas Aleatórias • Desenvolvimento Web",
    },
    {
        id: "jdSm-3cFsMg",
        title: "Criando uma API REST + Processo de Autenticação com TypeScript, NodeJS, Express, e MongoDB",
    },
];

const MainPage = () => {
    return (
        <div className="min-h-screen flex flex-col justify-start items-center p-5">
            <header>
                <a
                    href="https://www.youtube.com/@programacaocomramon"
                    target="_blank"
                    className="flex mb-5"
                >
                    <Image
                        src={logoImage}
                        alt=""
                        width={0}
                        height={0}
                        style={{
                            width: "70px",
                            height: "70px",
                            marginRight: "6px",
                        }} // optional
                    />

                    <div>
                        <h1
                            className={`text-white bg-[#00CC83] h-[32px] text-[20px] mb-[6px] px-1 ${luckiestGuy.className}`}
                        >
                            Programação com
                        </h1>
                        <h1
                            className={`text-white bg-[#00CC83] inline-block h-[32px] text-[20px] px-1 ${luckiestGuy.className}`}
                        >
                            Ramon
                        </h1>
                    </div>
                </a>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {videoList.map((video, idx) => (
                    <VideoCard key={idx} video={video} />
                ))}
            </div>
        </div>
    );
};

export default MainPage;
