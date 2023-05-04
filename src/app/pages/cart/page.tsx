"use client"
import ButtonCard from "@/app/components/button";
import CartProductInfo from "@/app/components/cartproductinfo";
import React from "react";
import { useSelector } from "react-redux";
import PageLayout from "@/app/components/pagelayout";
import Link from "next/link";
import Image from "next/image";
import ShoppingcartImage from "../../../media/shopping-cart.png"


export default function Cart() {

  const cartMeals = useSelector((state: any) => state.cartReducer);

  return (
    <PageLayout>
      {cartMeals !== null && cartMeals.length !== 0 ?
        <div className="bg-[white] text-black mb-[50px]">
          {cartMeals.map((meal: any) =>
            <>
              <CartProductInfo
                key={meal.selectedMeal.id}
                ProductID={meal.selectedMeal.id}
                CartProductImg={meal.selectedMeal.img_url.large}
                CartproductTitle={meal.selectedMeal.title}
                CartProductOption={meal.options}
                cartContainerWrapper_classname="flex justify-between px-[50px] py-[20px]"
                cartContainer_classname="flex"
                cartProductImage_classname="w-[200px]"
                cartProductTitle_classname="text-xl"
                cartContainerProductDetail_classname="flex flex-col justify-center m-[20px]"
                cartContainerProductDetailOption_classname="text-base"
              />

              <p className="absolute right-[250px] mt-[-150px] text-base font-bold">
                $ {meal.options.reduce((acc: any, item: any) => {
                  const price = parseFloat(item.price);
                  const count = parseInt(item.count);
                  return acc + price * count;
                }, 0).toFixed(2)}
              </p>
            </>
          )}
          <div className="flex justify-around border-t-2 border-slate-200">
            <h1 className="font-bold text-xl">Subtotal:</h1>
            <p className="font-bold text-xl w-[20px] h-[20px]">
              ${cartMeals.reduce((acc: any, obj: any) => {
                const options = obj.options;
                options.forEach((option: any) => {
                  const price = Number(option.price);
                  const count = Number(option.count);
                  acc += price * count;
                });
                return acc;
              }, 0).toFixed(2)}
            </p>
          </div>
          <div className="flex flex-wrap mt-[50px] justify-around">
            <div className="mt-5 mb-[30px]">
                <ButtonCard
                  button_text="Back to menu"
                  button_Classname="rounded-full w-[50%] p-[20px] bg-gray-300 min-w-[300px]"
                />              
            </div>
            <div className=" mt-5 mb-[30px]">
              <Link href="/pages/checkout">
                <ButtonCard
                  button_text="Checkout"
                  button_Classname="rounded-full text-[white] w-[50%] p-[20px] bg-[#C00A27] min-w-[300px]"
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
                <ButtonCard
                  button_text="Back to menu"
                  button_Classname="rounded-full w-[50%] p-[20px] bg-gray-300 min-w-[300px]"
                />              
            </div>
          </div>}
    </PageLayout>
  )
}
