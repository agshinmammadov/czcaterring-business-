import Image from "next/image";
import Logo from "../../media/logo.png";
import Facebookicon from '../../media/facebook.svg'
import Twittericon from '../../media/twitter.svg'
import Instagramicon from '../../media/instagram.svg'

export default function Footer() {
    return (
        <>
            <footer className="relative bg-black text-white m-auto w-full">
                <div className="flex m-10 justify-center">
                    <Image className="bg-white" src={Facebookicon} alt="Facebook icon" />
                    <Image className="bg-white" src={Twittericon} alt="Twitter icon" />
                    <Image className="bg-white"  src={Instagramicon} alt="Instagram icon" />
                </div>
                <div className="flex justify-center m-10">
                    <Image src={Logo} alt="Footer Logo" />
                </div>
                <div className="flex justify-center m-10">Memo Shish Kebab | 100 West 23rd, New York, NY 10011 | (212) 381 2115</div>
                <div className="flex justify-center" > @ 2019 All Rights Reserved</div>
            </footer>

        </>
    )
}