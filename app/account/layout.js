import AccountNavBar from "@/app/account/account-navibar";
import MainLayout from "@/app/ui/MainLayout";

export default function Layout({children}) {
    return (
        <>
            <MainLayout>

                <AccountNavBar/>
                <main className="flex gap-10 p-5 bg-base-100 w-full">
                    {children}
                </main>
            </MainLayout>
        </>
    )
}