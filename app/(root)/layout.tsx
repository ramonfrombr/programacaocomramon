import { auth } from "@clerk/nextjs/server";
import { Sidebar } from "@/app/(root)/_components/sidebar";
import { Navbar } from "@/app/(root)/_components/Navbar";
import { Footer } from "@/components/footer";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const { userId } = auth()
    return (
        <div className="h-full">
            <div className="h-[80px] md:pl-[320px] fixed inset-y-0 w-full z-50">
                <Navbar />
            </div>
            <div className="hidden md:flex w-56 flex-col fixed inset-y-0 z-50">
                <Sidebar userLoggedIn={!!userId} />
            </div>
            <main className="md:pl-[320px] pt-[80px] min-h-screen bg-gray-50 flex flex-col justify-between">
                {children}
                <Footer />
            </main>
        </div>
    );
};

export default DashboardLayout;
