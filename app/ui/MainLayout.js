import AuthHeader from "@/app/ui/navbars/AuthHeader";
import ReduxLoader from "@/app/ui/loaders/ReduxLoader";
import ScrollToTop from "@/app/ui/loaders/ScrollToTop";
import AppFooter from "@/app/ui/AppFooter";
import ScrollToTopComponent from "@/app/common/ScrollToTopComponent";
import StoreProvider from "@/app/store/StoreProvider";

export default function MainLayout({children}) {

    return (

// <StoreProvider>
    <div className="flex flex-col m-0 p-0 text-black w-full max-w-full min-h-screen">
        <header className="flex flex-col w-full border-y-green-900 ">
            <AuthHeader/>
            <ReduxLoader/>
        </header>
        <main className='flex w-full mx-auto overflow-y-auto overflow-hidden '>
            <ScrollToTop/>
            {children}
        </main>

        <AppFooter/>
        <ScrollToTopComponent/>
    </div>

// </StoreProvider>
    )}