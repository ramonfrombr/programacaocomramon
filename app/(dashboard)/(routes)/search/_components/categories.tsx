"use client";

import { Category } from "@prisma/client";

import { IconType } from "react-icons/lib";
import {
  FaNodeJs,
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaPython,
} from "react-icons/fa";
import { SiJavascript, SiPhp } from "react-icons/si";
import { CategoryItem } from "./category-item";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  ReactJS: FaReact,
  NodeJS: FaNodeJs,
  HTML: FaHtml5,
  CSS: FaCss3Alt,
  Python: FaPython,
  JavaScript: SiJavascript,
  PHP: SiPhp,
};

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};
