import { removeFromCart } from "../redux/actions/action";
import React from "react";
import { useDispatch } from "react-redux";
import closeButtonImage from "../public/media/closebutton.png";
import Image from "next/image";
 
type CartProductProps = {
    CartProductImg?: string,
    CartproductTitle: string,
    CartProductOption: any,
    ProductID:string,
    cartContainerWrapper_classname ?: string,
    cartContainer_classname ?: string,
    cartProductTitle_classname ?:string,
    cartProductImage_classname ?: string,
    cartContainerProductDetail_classname ?: string,
    cartContainerProductDetailOption_classname ?: string,
    removeBtn_classname?:string

}


const CartProductInfo: React.FC<CartProductProps> = ({
    CartProductImg,
    CartproductTitle,
    CartProductOption,
    ProductID,
    cartContainerWrapper_classname,
    cartContainer_classname,
    cartProductTitle_classname,
    cartProductImage_classname,
    cartContainerProductDetail_classname,
    cartContainerProductDetailOption_classname,
    removeBtn_classname

}) => {
    const dispatch = useDispatch();

    const removeFromCartHandler = (e: any) => {
        dispatch(removeFromCart(e.target.name))
    }
    return (
        <div className={cartContainerWrapper_classname}>
            <div className={cartContainer_classname}>
                <div><img className={cartProductImage_classname} src={CartProductImg} /></div>
                <div className={cartContainerProductDetail_classname}>
                    <h1 className={cartProductTitle_classname}>{CartproductTitle}</h1>
                    {CartProductOption.map((opt: any) => {
                        return <p className={cartContainerProductDetailOption_classname} key={opt.id}>
                            x{opt.count} {opt.optionName} ${opt.price}
                        </p>
                    })}
                </div>
            </div>
            <button
                key={ProductID}
                className={removeBtn_classname}
                onClick={removeFromCartHandler}
                name={ProductID}
            >
                <Image src={closeButtonImage} alt="Close button icon"></Image>
            </button>
        </div>)}

export default CartProductInfo