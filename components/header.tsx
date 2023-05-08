"use client"
import Image from "next/image";
import Logo from "../public/media/logo.png";
import Carticon from "../public/media/cart-icon.png";
import styles from '../styles/header.module.css'
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ButtonCard from "./button";
import CartProductInfo from "./cartproductinfo";
import Link from "next/link";
import SubTotalAmount from "./subtotal";
import ScrollToTop from "react-scroll-to-top";
import Sidebar from "./sidebar";

const Header = () => {
  const [products, setProducts] = useState<[]>([])
  const [showCartModal, setShowCartmodal] = useState(false)
  const [mealCategoryOnOff, setMealCategoryOnOff] = useState(false);

  const cartMeals = useSelector((state: any) => state.cartReducer);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        "https://gist.githubusercontent.com/turalus/8890c7e87f8274d7df062b16d4818dfd/raw/90ddd447d92f37f6768a0a3569afd7093c98cbcd/er_api_response.json"
      );
      const data = await res.json();
      setProducts(data.data.categories)
    };
    fetchProducts();
  }, []);  

  const showModalCart = () => {
    setShowCartmodal(true)
  }
  const hideModalCart = () => {
    setShowCartmodal(false)
  }
  const showhideModalCart = () => {
    setShowCartmodal(!showCartModal)
  }

  const showHideMenuCategories = () => {
    (setMealCategoryOnOff(!mealCategoryOnOff))
  }

  return (
    <header className={styles.header}>
      <nav className="flex fixed md:relative w-full top-0 p-3 justify-between md:justify-center items-center bg-[#C00A27] z-10 md:z-0 md:bg-transparent">
        <div className="w-[100px] md:hidden">
          <Link href="/">
            <Image src={Logo} alt="Logo" />
          </Link>
        </div>
        <div className="mt-5 hidden md:block">
          <Link href="/">
            <Image className="w-44" src={Logo} alt="Logo" />
          </Link>
        </div>
        <div className="gap-3 flex items-center md:hidden">
          <button onClick={showhideModalCart}><Image className="w-6" src={Carticon} alt="Shopping cart icon" /></button>
          <p className="absolute top-0 mt-3 ml-3 text-center font-bold text-[10px] text-[white] bg-[black] w-[15px] h-[15px]  rounded-full">{cartMeals !== null ? cartMeals.length : 0}</p>
          <button onClick={showHideMenuCategories} className="font-bold text-white">MENU</button>
        </div>
      </nav>

      {/* Mobile menu categories */}
      {mealCategoryOnOff &&
            <ul className="md:hidden fixed top-[45px] bg-gray-100 p-3 w-full mt-4 z-10 text-left text-black">
              {products.map((cat: any) =>              
                <a href={`/#${cat.title}`} key={cat.id}>
                  <Sidebar
                    sidebartitle={cat.title}
                    sidebartitle_classname="p-2 border-b-2 hover:bg-[#C00A27] w-full"
                    onClick_activity={showHideMenuCategories}
                  />
                </a>
              )}
            </ul>
          }

      <div className="hidden md:block md:fixed right-3.5 top-10 w-14 h-12 bg-[rgba(0,0,0,.4)] rounded-lg" onMouseOver={showModalCart} onMouseOut={hideModalCart}>
        <Image className="w-7 m-auto mt-2" src={Carticon} alt="Cart Busket" />
        <p className="absolute top-0 right-2 text-center font-bold text-[10px] text-white bg-red-700 w-[18px] h-[18px] leading-[18px] rounded-2xl">{cartMeals !== null ? cartMeals.length : 0}</p>
      </div>

      {showCartModal &&
        <div
          onMouseOver={showModalCart}
          onMouseOut={hideModalCart}
          className="fixed top-[53px] md:top-[85px] md:w-[400px] md:min-h-[70px] md:right-[40px] md:rounded text-[black]  min-h-[90px] bg-[white] p-5 drop-shadow-2xl z-50 w-full"
        >
          {cartMeals !== null && cartMeals.length !== 0 ?
            <>
              {cartMeals.map((meal: any) =>
                <div className="max-h-[500px]">
                  <CartProductInfo
                    key={meal.selectedMeal.id}
                    ProductID={meal.selectedMeal.id}
                    CartProductImg={meal.selectedMeal.img_url.small}
                    CartproductTitle={meal.selectedMeal.title}
                    CartProductOption={meal.options}
                    cartContainerWrapper_classname="flex justify-between p-3"                    
                    cartContainer_classname="flex"
                    cartContainerProductDetail_classname="flex flex-col ml-[10px] justify-center items-start text-[14px]"
                    cartContainerProductDetailOption_classname="text-xs"
                    removeBtn_classname="w-[25px] h-[25px] text-[red] rounded bg-gray-200"
                  />
                </div>
              )}
              <div className="flex flex-col items-center">
                <div className="w-[80%] mt-5">
                  <Link href="/cart">
                    <ButtonCard
                      button_text="View cart"
                      button_Classname="px-3 py-2 w-full rounded-lg bg-gray-300 "
                    />
                  </Link>
                </div>
                <div className="w-[80%]">
                  <Link href="/checkout">
                    <ButtonCard
                      subtotalamount={SubTotalAmount}
                      button_text="Checkout"
                      button_Classname="px-3 w-full py-2 bg-[#C00A27] text-white mt-5 rounded-lg"
                    />
                  </Link>
                </div>
              </div>
            </> : <div className="flex flex-col justify-center items-center max-h-[500px]">
              <p>Your cart is empty.</p>
              <div className="w-[80%] mt-5">
                <ButtonCard
                  button_text="Back to menu"
                  onClick={hideModalCart}
                  button_Classname="px-3 py-2 w-full rounded-lg bg-gray-300 md:hidden"
                />
              </div>
            </div>
          }
        </div>
      }

      <ScrollToTop
        smooth
        width="28px"
        color="white"
        style={{ backgroundColor: "#C00A27", display: "flex", justifyContent: "center", alignItems: "center" }}
        height="20px" />
    </header>
  );
};

export default Header;
