'use client'
import Search from "@/app/components/search";
import Sidebar from "@/app/components/sidebar";
import Link from "next/link";
import { useEffect, useState, SyntheticEvent } from "react";
import Productcard from "@/app/components/productcard";
import ProductDetailsOverlay from "./proddetailsoverlay";
import CartProductInfo from "@/app/components/cartproductinfo";
import { useDispatch, useSelector } from "react-redux";
import ButtonCard from "@/app/components/button";
import Image from "next/image";
import Loader from "../../media/foodloader.gif";
import Shoppingcart from "../../media/shopping-cart.png";
import { menuCategories } from "@/redux/actions/action";
import bookmark from "../../media/bookmarkicon.png"

const Home = () => {
  const [products, setProducts] = useState<[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [showProdDetailOverlay, setShowProdDetailOverlay] = useState(false);
  const [clickedMeal, setClickedMeal] = useState('');

  const showMenuCategories = useSelector((state: any) => state.categoriesReducer);

  const cartMeals = useSelector((state: any) => state.cartReducer);
  const dispatch = useDispatch();

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
                <a href={`#${cat.title}`} key={cat.id}>
                  <Sidebar
                    sidebartitle={cat.title}
                    sidebartitle_classname="p-2"
                  />
                </a>
              )}
            </ul>
          </div>
          {/* For mobile devices */}
          {showMenuCategories &&
            <ul className="md:hidden fixed top-[45px] bg-gray-100 p-3 w-full mt-4">
              {products.map((cat: any) =>
                <a href={`#${cat.title}`} key={cat.id}>
                  <Sidebar
                    sidebartitle={cat.title}
                    sidebartitle_classname="p-2 border-b-2 hover:bg-[#C00A27]"
                    onClick_activity={() => dispatch(menuCategories(!showMenuCategories))}
                  />
                </a>
              )}
            </ul>
          }
          <div className="w-[90%] md:w-[50%] min-h-50vh mt-5 min-w-[250px]">
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
              <Image className="w-[25px] h-[25px]" src={bookmark} alt="bookmark icon" />
              <h1 className="font-bold text-2xl"> Cart</h1>
            </div>
            {cartMeals && cartMeals.length !== 0 ?
              <>
                {cartMeals.map((meal: any) =>
                  <>
                    <CartProductInfo
                      key={meal.selectedMeal.id}
                      ProductID={meal.selectedMeal.id}
                      CartProductImg={meal.selectedMeal.img_url.small}
                      CartproductTitle={meal.selectedMeal.title}
                      CartProductOption={meal.options}
                      cartContainerWrapper_classname="flex justify-between p-3 bg-gray-100"
                      cartContainer_classname="flex"
                      cartContainerProductDetail_classname="flex flex-col ml-[10px] justify-center items-start text-[14px]"
                      cartContainerProductDetailOption_classname="text-xs"
                    />
                  </>
                )}
                <div className="flex flex-col items-center justify-end bg-gray-100 pb-5">
                  <Link href="/checkout">
                    <ButtonCard
                      button_text="Checkout"
                      button_Classname="w-[200px] p-[10px] bg-[#C00A27] text-white rounded-full"
                    />
                  </Link>
                </div>
              </> : <div className="flex flex-col justify-center items-center bg-gray-100 min-h-[50vh] rounded-lg">
                <p>
                  <Image className="w-[100px]" src={Shoppingcart} alt="Shopping cart" />
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

