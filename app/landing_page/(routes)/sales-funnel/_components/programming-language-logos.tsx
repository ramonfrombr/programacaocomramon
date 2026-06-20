import Image from "next/image";
import CLogo from "@/public/programming_languages/c-logo.png";
import CPlusPlusLogo from "@/public/programming_languages/cplusplus-logo.png";
import CSharpLogo from "@/public/programming_languages/csharp-logo.png";
import CSSLogo from "@/public/programming_languages/css-logo.png";
import DjangoLogo from "@/public/programming_languages/django-logo.png";
import ExpressLogo from "@/public/programming_languages/express-logo.png";
import FlaskLogo from "@/public/programming_languages/flask-logo.png";
import HTMLLogo from "@/public/programming_languages/html-logo.png";
import JavaLogo from "@/public/programming_languages/java-logo.png";
import JavaScriptLogo from "@/public/programming_languages/javascript-logo.png";
import KotlinLogo from "@/public/programming_languages/kotlin-logo.png";
import LaravelLogo from "@/public/programming_languages/laravel-logo.png";
import MongoDBLogo from "@/public/programming_languages/mongodb-logo.webp";
import MySQLLogo from "@/public/programming_languages/mysql-logo.png";
import NestJSLogo from "@/public/programming_languages/nestjs-logo.svg";
import NextJSLogo from "@/public/programming_languages/nextjs-logo.png";
import NodeLogo from "@/public/programming_languages/node-logo.png";
import PHPLogo from "@/public/programming_languages/php-logo.png";
import PostgreSQLLogo from "@/public/programming_languages/postgresql-logo.png";
import PythonLogo from "@/public/programming_languages/python-logo.webp";
import ReactLogo from "@/public/programming_languages/react-logo.png";
import RedisLogo from "@/public/programming_languages/redis-logo.webp";
import RubyLogo from "@/public/programming_languages/ruby-logo.png";
import RubyOnRailsLogo from "@/public/programming_languages/rubyonrails-logo.png";
import SwiftLogo from "@/public/programming_languages/swift-logo.png";
import TypeScriptLogo from "@/public/programming_languages/typescript-logo.png";
import VueLogo from "@/public/programming_languages/vue-logo.png";

const programmingLanguageLogos = [
    { name: "HTML", image: HTMLLogo },
    { name: "CSS", image: CSSLogo },
    { name: "JavaScript", image: JavaScriptLogo },
    { name: "TypeScript", image: TypeScriptLogo },
    { name: "React", image: ReactLogo },
    { name: "Next.js", image: NextJSLogo },
    { name: "Vue.js", image: VueLogo },
    { name: "Node.js", image: NodeLogo },
    { name: "Express.js", image: ExpressLogo },
    { name: "Nest.js", image: NestJSLogo },
    { name: "Python", image: PythonLogo },
    { name: "Django", image: DjangoLogo },
    { name: "Flask", image: FlaskLogo },
    { name: "MySQL", image: MySQLLogo },
    { name: "PostgreSQL", image: PostgreSQLLogo },
    { name: "MongoDB", image: MongoDBLogo },
    { name: "Redis", image: RedisLogo },
] as const;

export function ProgrammingLanguageLogos() {
    return (
        <ul
            aria-label="Programming languages and technologies"
            className="flex flex-wrap justify-center items-center gap-6 md:gap-8 mb-12 md:mb-16"
        >
            {programmingLanguageLogos.map((language) => (
                <li key={language.name} className="group relative">
                    <Image
                        src={language.image}
                        alt={language.name}
                        title={language.name}
                        width={320}
                        height={128}
                        className="h-12 md:h-20 w-auto object-contain"
                    />
                    <span
                        role="tooltip"
                        className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100"
                    >
                        {language.name}
                    </span>
                </li>
            ))}
        </ul>
    );
}
