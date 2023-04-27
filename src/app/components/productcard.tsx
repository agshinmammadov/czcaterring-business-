import { FC } from "react";
import React from "react";

type ProductProps = {
  title: string;
  img_url: string;
  min_price? : number;
  max_price?: number;
  onClick:any,
  container_classname?:string
  img_classname?:string
  title_classname?:string
  price_classname?:string
  identifier:string | undefined
};



const Productcard: React.FC<ProductProps> = ({ 
  title, 
  img_url, 
  min_price, 
  max_price,
  onClick, 
  container_classname,
  img_classname,
  title_classname,
  price_classname,
  identifier}) => {
  return (
    <div className={container_classname} onClick={onClick} identifier = {identifier} >
      <img src={img_url} alt={title} className={img_classname}/>
      <h3 className={title_classname}>{title}</h3>
      {min_price && max_price ? (
        <p className={price_classname}>$ {min_price} - {max_price}</p>
      ) : (
        min_price ? <p className={price_classname}>$ {min_price}</p> : null
      )}
    </div>
  );
};

export default Productcard;

