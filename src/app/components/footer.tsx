import Image from "next/image";
import Logo from "../../media/logo.png";
import Facebookicon from '../../media/facebookicon.png'
import Twittericon from '../../media/twittericon.png'
import Instagramicon from '../../media/instagramicon.png'
import Link from "next/link";

export default function Footer() {
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
                    <Link href="/">
                        <Image src={Logo} alt="Footer Logo" />
                    </Link>
                </div>
                <div className="flex justify-center m-10">Memo Shish Kebab | 100 West 23rd, New York, NY 10011 | (212) 381 2115</div>
                <div className="flex justify-center" > @ 2019 All Rights Reserved</div>
            </footer>

        </>
    )
}