import React from "react";
import {FC} from "react";

type Sidebarprops = {
    sidebartitle:string,
    sidebartitle_classname?:string
    onClick_activity ?:any
};


const Sidebar: React.FC<Sidebarprops> = ({sidebartitle, sidebartitle_classname, onClick_activity}) =>{
    return (
        <li className={sidebartitle_classname} onClick={onClick_activity}>{sidebartitle}</li>
    )
    
};

export default Sidebar;