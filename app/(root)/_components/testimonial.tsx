import { Star } from "lucide-react";

export const Testimonial = () => {
  return (
    <div className="text-center flex flex-col items-center text-sm text-slate-500">
      <div className="flex mb-3">
        {Array.from(Array(5).keys()).map((number) => (
          <Star key={number} fill="orange" color="orange" size={20} />
        ))}
      </div>

      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est voluptatem
        reprehenderit pariatur possimus, earum mollitia molestiae. Deleniti
        nulla veritatis ex repudiandae fugiat esse omnis nesciunt quisquam
        architecto porro. Nobis, commodi?
      </p>

      <div className="flex items-center mt-3">
        <span className="mr-2 w-[30px] h-[30px] rounded-full bg-black inline-block"></span>
        <span className="font-semibold">Ramon Rodrigues</span>
      </div>
    </div>
  );
};
