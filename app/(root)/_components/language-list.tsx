import Image from "next/image";
import HTML from "@/public/programming_languages/html-logo.png";
import CSS from "@/public/programming_languages/css-logo.png";
import JavaScript from "@/public/programming_languages/javascript-logo.png";
import Python from "@/public/programming_languages/python-logo.webp";
import Ruby from "@/public/programming_languages/ruby-logo.png";
import PHP from "@/public/programming_languages/php-logo.png";
import C from "@/public/programming_languages/c-logo.png";
import PostgreSQL from "@/public/programming_languages/postgresql-logo.png";
import MySQL from "@/public/programming_languages/mysql-logo.png";
import MongoDB from "@/public/programming_languages/mongodb-logo.webp";
import Redis from "@/public/programming_languages/redis-logo.webp";
import React from "@/public/programming_languages/react-logo.png";
import Express from "@/public/programming_languages/express-logo.png";
import Node from "@/public/programming_languages/node-logo.png";
import Next from "@/public/programming_languages/nextjs-logo.png";
import Nest from "@/public/programming_languages/nestjs-logo.svg";
import Flask from "@/public/programming_languages/flask-logo.png";
import Django from "@/public/programming_languages/django-logo.png";
import TypeScript from "@/public/programming_languages/typescript-logo.png";

import Link from "next/link";

const programmingLanguages = [
    {
        image: HTML,
        name: "HTML",
    },
    {
        image: CSS,
        name: "CSS",
    },
    {
        image: JavaScript,
        name: "JavaScript",
    },
    /*
    {
        image: TypeScript,
        name: "TypeScript",
    },
    {
        image: Node,
        name: "Node.js",
    },
    {
        image: Express,
        name: "Express.js",
    },
    {
        image: Nest,
        name: "Nest.js",
    },
    {
        image: React,
        name: "React.js",
    },
    {
        image: Next,
        name: "Next.js",
    },
    {
        image: Python,
        name: "Python",
    },
    {
        image: Django,
        name: "Django",
    },
    {
        image: Flask,
        name: "Flask",
    },
    {
        image: PostgreSQL,
        name: "PostgreSQL",
    },
    {
        image: C,
        name: "C",
    },
    */
];

export const LanguageList = () => {
    return (
        <div className="my-10 md:my-20 md:w-4/5">
            <h2 className="text-center text-2xl font-bold mb-5">
                Explore por <span className="text-blue-600">Categoria</span>
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-4">
                {programmingLanguages.map((language) => (
                    <Link
                        href={`/technology/${language.name}`}
                        key={language.name}
                        className="items-center shadow-md border w-[100px] h-[100px] p-2 flex flex-col justify-between hover:scale-105 hover:shadow-lg transition"
                    >
                        <Image
                            src={language.image}
                            height={50}
                            width={50}
                            alt={language.name}
                        />
                        <span className="text-blue-500 font-semibold">
                            {language.name}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
};
