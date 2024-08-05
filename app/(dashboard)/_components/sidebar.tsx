import { Logo } from "./Logo";
import { SidebarRoutes } from "./sidebar-routes";
import { auth } from "@clerk/nextjs/server";

export const Sidebar = () => {
  const { userId } = auth();

  return (
    <div className="h-full border-r flex-col overflow-y-auto bg-white shadow-sm md:w-[300px]">
      <div className="p-3">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes userLoggedIn={userId ? true : false} />
      </div>
    </div>
  );
};
