import AccountNavBar from "@/app/account/account-navibar";

export default function Layout({ children } ) {
    return (
        <>


            <AccountNavBar/>
            <main className="flex gap-10 p-5 bg-blue-400 w-full">

                {children}
            </main>
        </>
    )
}