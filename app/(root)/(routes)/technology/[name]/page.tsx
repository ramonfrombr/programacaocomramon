"use client";
import React, { useEffect, useState } from 'react'
import HTML from "@/public/programming_languages/html-logo.png";
import CSS from "@/public/programming_languages/css-logo.png";
import JavaScript from "@/public/programming_languages/javascript-logo.png";
import Python from "@/public/programming_languages/python-logo.webp";
import Header from '../../career/_components/header';
import CoursesSection from '../../career/_components/courses-section';
import LEVELS from '@/constants/levels';
import axios from 'axios';
import { useLanguageStore } from '@/hooks/use-language-store';
import { ClipLoader } from 'react-spinners';

const TechnologyPage = ({
  params,
}: {
  params: { name: string };
}) => {
    const language = useLanguageStore().careersPage;
  
    const [beginnerCourses, setBeginnerCourses] = useState([]);
    const [intermediateCourses, setIntermediateCourses] = useState([]);
    const [advancedCourses, setAdvancedCourses] = useState([]);
    const [specialistCourses, setSpecialistCourses] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function fetchData() {
        const response = await axios.get(`/api/categories/${params.name}`);

        setLoading(false);

        setBeginnerCourses(response.data.beginner);
        setIntermediateCourses(response.data.intermediate);
        setAdvancedCourses(response.data.advanced);
        setSpecialistCourses(response.data.specialist);
      }
      fetchData();
    }, [params]);


  const programmingLanguagesImages = {
    "HTML": HTML,
    "CSS": CSS,
    "JavaScript": JavaScript,
    "Python": Python
  }

  const description = {
    HTML: "HTML significa HyperText Markup Language, ou em português, Linguagem de Marcação de Hipertexto. É a linguagem padrão usada para criar páginas na web.",
    CSS: "CSS significa Cascading Style Sheets, ou em português, Folhas de Estilo em Cascata. É a linguagem usada para estilizar páginas feitas com HTML.",
    JavaScript: "JavaScript é uma linguagem de programação usada principalmente para tornar páginas web interativas e dinâmicas.",
    Python: "Python é uma linguagem de programação de alto nível, conhecida por ser simples, clara e poderosa. É muito usada tanto por iniciantes quanto por profissionais experientes em várias áreas da tecnologia."
  }

  return (
    <div className="px-5 md:px-10 lg:px-20">
      <Header heading={`${language.chooseACourse} ${params.name}`} image={programmingLanguagesImages[params.name as keyof typeof programmingLanguagesImages]} description={description[params.name as keyof typeof description]} />

      {loading ? (
        <div className="flex items-center justify-center">
          <ClipLoader />
        </div>
      ) : (
        <div>
          {!!beginnerCourses.length && (
            <CoursesSection
              courses={beginnerCourses}
              level={LEVELS.BEGINNER}
            />
          )}

          {!!intermediateCourses.length && (
            <CoursesSection
              courses={intermediateCourses}
              level={LEVELS.INTERMEDIATE}
            />
          )}

          {!!advancedCourses.length && (
            <CoursesSection
              courses={advancedCourses}
              level={LEVELS.ADVANCED}
            />
          )}

          {!!specialistCourses.length && (
            <CoursesSection
              courses={specialistCourses}
              level={LEVELS.SPECIALIST}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default TechnologyPage