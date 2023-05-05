import Image from "next/image";
import React from "react";
import Searchicon from "../public/media/search.png"

type Searchprops = {
    search_div_classname?: string,
    search_input_classname?:string,
    onChange:any
};
const  Search: React.FC<Searchprops> = ({search_div_classname, search_input_classname, onChange}) =>{
    return(
        <div className={search_div_classname}>
            <input 
                className={search_input_classname} 
                onChange={onChange} type="search" placeholder="Search"/>
                <Image src={Searchicon} alt="Search icon" className="right-[60px] mt-[-30px] absolute w-[20px] md:top-[55px] md:right-[30px]"/>
        </div>
    )
};
export default Search;