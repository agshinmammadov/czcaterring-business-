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
import ScrollToTop from "react-scroll-to-top";
import Sidebar from "./sidebar";
import { NoSsr } from "@mui/material";

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

  const unHideCategoryName = (event: any, targetId: any) => {
    event.preventDefault();

    const navbarHeight = 80; // Replace with the height of your fixed navbar in pixels
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };
  const modalCartTotal = cartMeals !== null && cartMeals.reduce((acc: any, obj: any) => {
    const options = obj.options;
    options.forEach((option: any) => {
      const price = Number(option.price);
      const count = Number(option.count);
      acc += price * count;
    });
    return acc;
  }, 0).toFixed(2)


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
          <div className="absolute top-0 mt-3 ml-3 text-center font-bold text-[10px] text-[white] bg-[black] w-[15px] h-[15px]  rounded-full">
            <NoSsr>
              {cartMeals !== null ? cartMeals.length : 0}
            </NoSsr>
          </div>
          <Link href="/"><button onClick={showHideMenuCategories} className="font-bold text-white">MENU</button></Link>
        </div>
      </nav>

      {/* Mobile menu categories */}
      {mealCategoryOnOff &&
        <ul className="md:hidden fixed top-[45px] bg-gray-100 p-3 w-full mt-4 z-10 text-left text-black">
          {products.map((cat: any) =>
            <Link href={`/#${cat.title}`} key={cat.id} onClick={(event) => unHideCategoryName(event, cat.title)}>
              <Sidebar
                sidebartitle={cat.title}
                sidebartitle_classname="p-2 border-b-2 hover:bg-[#C00A27] hover:text-white w-full"
                onClick_activity={showHideMenuCategories}
              />
            </Link>
          )}
        </ul>
      }

      <div className="hidden md:block md:fixed right-5 top-10 w-14 h-12 bg-[rgba(0,0,0,.4)] rounded-lg" onMouseOver={showModalCart} onMouseOut={hideModalCart}>
        <Image className="w-7 m-auto mt-2" src={Carticon} alt="Cart Busket" />
        <div className="absolute top-0 right-2 text-center font-bold text-[10px] text-white bg-red-700 w-[18px] h-[18px] leading-[18px] rounded-2xl">
          <NoSsr>
            {cartMeals !== null ? cartMeals.length : 0}
          </NoSsr>
        </div>
      </div>

      {showCartModal &&
        <div
          onMouseOver={showModalCart}
          onMouseOut={hideModalCart}
          className="fixed top-[53px] md:top-[85px] md:w-[400px] md:min-h-[70px] md:right-[40px] md:rounded text-[black]  min-h-[90px] bg-[white] p-[5px] md:p-5 md:pr-1 drop-shadow-2xl z-50 w-full"
        >
          {cartMeals !== null && cartMeals.length !== 0 ?
            <>
              <div className="overflow-y-auto max-h-[300px]">
                {cartMeals.map((meal: any) =>
                  <div className="max-h-[500px]">
                    <CartProductInfo
                      key={meal.selectedMeal.id}
                      ProductID={meal.selectedMeal.id}
                      CartProductImg={meal.selectedMeal.img_url.small}
                      CartproductTitle={meal.selectedMeal.title}
                      CartProductOption={meal.options}
                      cartContainerWrapper_classname="flex flex-wrap justify-between p-[2px] md:p-3 border-b-2"
                      cartContainer_classname="flex flex-wrap"
                      cartContainerProductDetail_classname="flex flex-col ml-[5px] md:ml-[10px] justify-center items-start text-xs md:text-lg"
                      cartContainerProductDetailOption_classname="text-xs"
                      removeBtn_classname="right-[30px] mt-1 w-[25px] h-[25px] text-[red] rounded"
                    />
                  </div>
                )}
              </div>
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
                      subtotalamount={`$${modalCartTotal}`}
                      button_text="Checkout"
                      button_Classname="px-3 w-full py-2 bg-[#C00A27] text-white mt-5 rounded-lg"
                    />
                  </Link>
                </div>
              </div>
            </> : <div className="flex flex-col justify-center items-center max-h-[500px]">
              <p>Your cart is empty.</p>
              <div className="w-[80%] mt-5">
                <Link href="/">
                  <ButtonCard
                    button_text="Back to menu"
                    onClick={hideModalCart}
                    button_Classname="px-3 py-2 w-full rounded-lg bg-gray-300 md:hidden"
                  />
                </Link>
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