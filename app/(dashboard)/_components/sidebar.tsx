import { auth } from "@clerk/nextjs/server";
import { Logo } from "@/app/(dashboard)/_components/Logo";
import { SidebarRoutes } from "@/app/(dashboard)/_components/sidebar-routes";

export const Sidebar = () => {
    const { userId } = auth();

    return (
        <div className="h-full border-r flex-col overflow-y-auto bg-white shadow-sm md:w-[320px]">
            <div className="p-3">
                <Logo />
            </div>
            <div className="flex flex-col w-full">
                <SidebarRoutes userLoggedIn={userId ? true : false} />
            </div>
            {/**
            <div className="bg-black/5 pt-5 px-4 pb-4">
                <div className="bg-blue-700 p-5 rounded">
                    <h3 className="text-white font-bold text-center">
                        Assine a{" "}
                        <span className="bg-gradient-to-br from-yellow-300 to-yellow-500 border-orange-400 text-black p-1 rounded mx-1">
                            Versão PREMIUM
                        </span>{" "}
                        e desbloqueie todos os cursos e funcionalidades
                    </h3>
                </div>
            </div>
             */}
        </div>
    );
};
