"use client"
import ButtonCard from "../../components/button";
import CartProductInfo from "../../components/cartproductinfo";
import React from "react";
import { useSelector } from "react-redux";
import PageLayout from "../../components/pagelayout";
import Link from "next/link";
import Image from "next/image";
import ShoppingcartImage from "../../public/media/shopping-cart.png";

export default function Cart() {
  const cartMeals = useSelector((state: any) => state.cartReducer);

  const subTotal = cartMeals !== null && cartMeals.reduce((acc: any, obj: any) => {
    const options = obj.options;
    options.forEach((option: any) => {
      const price = Number(option.price);
      const count = Number(option.count);
      acc += price * count;
    });
    return acc;
  }, 0).toFixed(2)

  return (
    <PageLayout>
      {cartMeals !== null && cartMeals.length !== 0 ?
        <div className="text-black px-[5px] md:px-[20px] bg-white">
          {cartMeals.map((meal: any) =>
            <>
              <CartProductInfo
                key={meal.selectedMeal.id}
                ProductID={meal.selectedMeal.id}
                CartProductImg={meal.selectedMeal.img_url.large}
                CartproductTitle={meal.selectedMeal.title}
                CartProductOption={meal.options}
                cartContainerWrapper_classname="flex flex-wrap justify-between px-[10px] md:px-[50px] py-[5px] md:py-[20px] border-2 rounded-lg mt-5"
                cartContainer_classname="flex flex-wrap"
                cartProductImage_classname="w-[200px]"
                cartProductTitle_classname="text-xl font-bold"
                cartContainerProductDetail_classname="flex flex-col justify-center m-[5px] md:m-[20px]"
                cartContainerProductDetailOption_classname="text-xs md:text-base"
                removeBtn_classname="absolute right-6 md:right-10 mt-1 w-6 h-6 rounded text-black bg-gray-300"
              />

              <p className="absolute right-[25px]  md:right-12 md:right-[50px] mt-[-50px] md:mt-[-150px] text-base font-bold">
                $ {meal.options.reduce((acc: any, item: any) => {
                  const price = parseFloat(item.price);
                  const count = parseInt(item.count);
                  return acc + price * count;
                }, 0).toFixed(2)}
              </p>
            </>
          )}
          
          <div className="flex flex-wrap mt-[50px] justify-around gap-3">
            <div className=" mb-[10px]">
              <Link href="/">
                <ButtonCard
                  button_text="Back to menu"
                  button_Classname="rounded-full w-[50%] p-[10px] bg-gray-300 min-w-[300px]"
                />
              </Link>
            </div>
            <div className="mb-[10px]">
              <Link href="/checkout">
                <ButtonCard
                  button_text="Checkout"
                  subtotalamount={`$${subTotal}`}
                  button_Classname="rounded-full text-[white] w-[50%] p-[10px] bg-[#C00A27] min-w-[300px]"
                />
              </Link>
            </div>
          </div>
        </div> :
        <div className="flex flex-col justify-center items-center min-h-[30vh] bg-[white] text-[black] mt-[40px]">
          <p className="font-bold text-xl">Your cart is empty.</p>
          <div>
            <Image className="w-[100px]" src={ShoppingcartImage} alt="Shopping cart empty" />
          </div>
          <div className="mt-5 mb-[30px]">
            <Link href="/">
              <ButtonCard
                button_text="Back to menu"
                button_Classname="rounded-full w-[50%] p-[10px] bg-gray-300 min-w-[300px]"
              />
            </Link>
          </div>
        </div>}
    </PageLayout>
  )
}
