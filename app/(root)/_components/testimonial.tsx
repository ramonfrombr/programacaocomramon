import Image, { StaticImageData } from "next/image";
import { Star } from "lucide-react";

interface TestimonialProps {
  testimonial: string;
  personName: string;
  image: StaticImageData;
}

export const Testimonial = ({
  testimonial,
  personName,
  image,
}: TestimonialProps) => {
  return (
    <div className="text-center flex flex-col items-center text-sm text-slate-500">
      <div className="flex mb-3">
        {Array.from(Array(5).keys()).map((number) => (
          <Star key={number} fill="orange" color="orange" size={20} />
        ))}
      </div>

      <p>{testimonial}</p>

      <div className="flex items-center mt-3">
        <span className="mr-2 w-[30px] h-[30px] rounded-full bg-black inline-block overflow-hidden">
          <Image
            src={image}
            height={30}
            width={30}
            alt="Testimonial person image"
            className="object-cover"
          />
        </span>
        <span className="font-semibold">{personName}</span>
      </div>
    </div>
  );
};
