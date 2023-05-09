import React from "react";

type ButtonProps = {
    button_text:string,
    onClick?:any,
    button_Classname? :string
    name?:string,
    subtotalamount?:any
}

const ButtonCard: React.FC<ButtonProps> = ({
button_text,
onClick,
name,
button_Classname,
subtotalamount
}) => {
    return (
        <button name={name} className={button_Classname} onClick={onClick}>
            {button_text}  {subtotalamount}
        </button>
    )
}
export default ButtonCard;