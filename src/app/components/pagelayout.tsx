import React from "react";
import Header from "./header";
import Footer from "./footer";

interface PageLayoutProps {
    children:React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({children}) =>{
    return(
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default PageLayout;