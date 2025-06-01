import { NavbarRoutes } from "@/components/navbar-routes";
import { MobileSidebar } from "@/app/(dashboard)/_components/MobileSidebar";

export const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};
