'use client'
import Search from "./search"
import Sidebar from "./sidebar";
import Link from "next/link";
import React, { useEffect, useState, SyntheticEvent } from "react";
import Productcard from "./productcard";
import ProductDetailsOverlay from "./proddetailsoverlay";
import CartProductInfo from "./cartproductinfo";
import { useSelector } from "react-redux";
import ButtonCard from "./button";
import Image from "next/image";
import Loader from "../public/media/foodloader.gif";
import Shoppingcart from "../public/media/shopping-cart.png";

const Home = () => {
  const [products, setProducts] = useState<[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [showProdDetailOverlay, setShowProdDetailOverlay] = useState(false);
  const [clickedMeal, setClickedMeal] = useState('');


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

  useEffect(() => {
    if (showProdDetailOverlay) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showProdDetailOverlay])


  const filteredData = products.filter((category: any) => {
    return category.items.some((item: any) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  const HandleSearchResult = (e: any) => {
    setSearchValue(e.target.value)
  }

  const SelectedMealHandler = (event: SyntheticEvent<HTMLDivElement>) => {
    const firstResultOfClick: any = event.currentTarget.getAttribute('id')
    setClickedMeal(firstResultOfClick)
    setShowProdDetailOverlay(true)
  }

  const closeDetailOverlay = () => {
    setShowProdDetailOverlay(false)
  }

  const SmoothScroll = (event: any, targetId: any) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };

  const sidebarMiniCartTotal = cartMeals !== null && cartMeals.reduce((acc: any, obj: any) => {
    const options = obj.options;
    options.forEach((option: any) => {
      const price = Number(option.price);
      const count = Number(option.count);
      acc += price * count;
    });
    return acc;
  }, 0).toFixed(2)


  if (products.length != 0) {
    return (
      <>
        <div className="flex flex-row justify-center md:justify-start 2xl:justify-center flex-wrap bg-white text-black h-full px-5 ">
          <div className=" md:block w-full md:sticky md:top-0 md:w-[25%] md:max-w-[350px] md:h-[600px] p-4  mt-5">
            <Search
              search_input_classname="p-2 bg-white border border-slate-600 w-full rounded-md"
              onChange={HandleSearchResult}
            />
            <ul className="hidden md:block rounded-lg bg-gray-100 p-3 w-full mt-4">
              {products.map((cat: any) =>
                <Link href={`#${cat.title}`} key={cat.id} onClick={(event) => SmoothScroll(event, cat.title)}>
                  <Sidebar
                    sidebartitle={cat.title}
                    sidebartitle_classname="p-2"
                  />
                </Link>
              )}
            </ul>
          </div>

          <div className="w-[90%]  md:w-[50%] min-h-50vh mt-5 min-w-[250px]">
            {filteredData.map((item: any) =>
              <div className="mt-10" key={item.id}>
                <h1 className="text-2xl font-bold md:text-3xl" id={item.title}>{item.title}</h1>
                <div className="flex flex-wrap mt-2">
                  {item.items.filter((item: any) =>
                    item.title.toLowerCase().includes(searchValue.toLowerCase())).map((el: any) =>
                      <Productcard
                        key={el.id}
                        id={el.id}
                        title={el.title}
                        img_url={el.img_url.large}
                        min_price={el.min_price}
                        max_price={el.max_price}
                        onClick={SelectedMealHandler}
                        container_classname="flex flex-col lg:w-1/3 sm:w-1/2  text-black text-center px-3 cursor-pointer"
                        img_classname="max-w-full"
                        title_classname="text-base"
                        price_classname="text-base"
                      />
                    )}
                </div>
              </div>
            )}
          </div>

          {/* Mini Cart Sidebar */}
          <div className="hidden md:block sticky top-0 w-[25%]  mt-5 h-[500px] text-[black]">
            <div className="flex items-center">
              <h1 className="font-bold text-2xl"> Cart</h1>
            </div>
            {cartMeals !== null && cartMeals.length !== 0 ?
              <>
                <div className="overflow-y-auto bg-gray-100 max-h-[300px]  rounded">
                  {cartMeals.map((meal: any) =>
                    <React.Fragment key={meal.selectedMeal.id}>
                      <CartProductInfo                        
                        ProductID={meal.selectedMeal.id}
                        CartProductImg={meal.selectedMeal.img_url.small}
                        CartproductTitle={meal.selectedMeal.title}
                        CartProductOption={meal.options}
                        cartContainerWrapper_classname="flex justify-between p-3 bg-gray-100 border-b-2 border-gray-300"
                        cartContainer_classname="flex"
                        cartContainerProductDetail_classname="flex flex-col ml-[10px] justify-center items-start text-xs md:text-lg"
                        cartContainerProductDetailOption_classname="text-xs"
                        removeBtn_classname="w-[20px] h-[20px] opacity-80 rounded text-[red]"
                      />
                    </React.Fragment>
                  )}
                </div>
                <div className="flex flex-col items-center justify-end bg-gray-100 pb-5 pt-3">
                  <Link href="/checkout">
                    <ButtonCard
                      button_text="Checkout"
                      subtotalamount={`$${sidebarMiniCartTotal}`}
                      button_Classname="w-[200px] p-[10px] bg-[#C00A27] text-white rounded-full"
                    />
                  </Link>
                </div>
              </> : <div className="flex flex-col justify-center items-center bg-gray-100 min-h-[50vh] rounded-lg">
                <p>
                  <Image className="w-[100px] opacity-40" src={Shoppingcart} alt="Shopping cart" />
                </p>
                <p>Your cart is empty.</p>
              </div>}
          </div>
        </div>
        {showProdDetailOverlay !== false &&
          <div >
            <ProductDetailsOverlay
              clickedMeal={clickedMeal !== '' && clickedMeal}
              closeProductDetailOverlay={closeDetailOverlay}
            />
          </div>
        }

      </>
    )
  }
  else {
    return <div className="w-100vw h-60vh bg-[white] flex justify-center">
      <Image src={Loader} alt="Menu loading" />
    </div>
  }
};
export default Home;

