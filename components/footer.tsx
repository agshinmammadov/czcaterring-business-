"use client"
import  { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "../public/media/logo.png";
import Facebookicon from '../public/media/facebookicon.png'
import Twittericon from '../public/media/twittericon.png'
import Instagramicon from '../public/media/instagramicon.png'
import Link from "next/link";

export default function Footer() {
    const [footerAddress, setFooterAddress] = useState(null);

    useEffect(() => {
        const fetchFooterInfo = async () => {
          const res = await fetch(
            "https://gist.githubusercontent.com/turalus/8890c7e87f8274d7df062b16d4818dfd/raw/90ddd447d92f37f6768a0a3569afd7093c98cbcd/er_api_response.json"
          );
          const data = await res.json();
          setFooterAddress(data.data.address_on_footer)
        };
        fetchFooterInfo();
      }, []);

    return (
        <>
            <footer className="relative bg-black text-white pt-[30px] mx-auto w-full">
                <div className="flex m-10 justify-center gap-5">
                    <Link href="https://www.facebook.com/memoshishkebabmanhattan/" target="_blank" rel="noopener noreferrer">
                        <Image  src={Facebookicon} alt="Facebook icon" className="w-[40px]" />
                    </Link>                  
                    <Link href="https://twitter.com/memoshishkebab" target="_blank" rel="noopener noreferrer">
                        <Image src={Twittericon} alt="Twitter icon" className="w-[40px]" />
                    </Link>
                    <Link href="https://www.instagram.com/memoshishkebab/" target="_blank" rel="noopener noreferrer">
                        <Image  src={Instagramicon} alt="Instagram icon" className="w-[40px]" />
                    </Link>
                </div>
                <div className="flex justify-center m-10">
                    <Link href='/'>                    
                        <Image src={Logo} alt="Footer Logo" />   
                    </Link>                 
                </div>
                <div className="flex justify-center m-10">{footerAddress !== null && footerAddress}</div>
                <div className="flex justify-center" > @ 2019 All Rights Reserved</div>
            </footer>

        </>
    )
}