import { Testimonial } from "./testimonial";

export const Testimonials = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border shadow px-5 py-10 mt-10">
      <Testimonial />
      <Testimonial />
      <Testimonial />
    </div>
  );
};
