import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/action";
import carticon from "../public/media/cart-icon.png"
import Image from "next/image";
import closeButtonIcon from "../public/media/closebutton.png"

type MealOption = {
  optionName: string,
  price: any,
  count: any,
  id: string
}

type MealData = {
  selectedMeal: any,
  options: MealOption[],
  specialRequest: string
}
type Productdetailprops = {
  clickedMeal: any
  closeProductDetailOverlay: any
}

const ProductDetailsOverlay: React.FC<Productdetailprops> = ({
  clickedMeal, closeProductDetailOverlay }) => {
  const [mealData, setMealData] = useState<MealData>({
    selectedMeal: null,
    options: [],
    specialRequest: ""
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMealLists = async () => {
      const res = await fetch(
        "https://gist.githubusercontent.com/turalus/8890c7e87f8274d7df062b16d4818dfd/raw/90ddd447d92f37f6768a0a3569afd7093c98cbcd/er_api_response.json"
      );
      const data = await res.json();
      const findClickedMeal = data.data.items.filter(((item: any) => item.id === clickedMeal))[0];
      setMealData({ ...mealData, selectedMeal: findClickedMeal });
    };
    fetchMealLists();

  }, []);


  useEffect(() => {
    // Update state based on condition
    if (mealData.selectedMeal !== null && mealData.selectedMeal.opt_groups.length === 0) {
      setMealData((prevState: any) => ({
        ...prevState,
        options: [...prevState.options, { count: 1, price: prevState.selectedMeal.price }]
      }));
    }
  }, [mealData.selectedMeal]);


  const handleCheckboxChange = (e: any) => {
    const choosedOptionSet = { optionName: e.target.value, price: e.target.name, count: 1, id: e.target.id }
    setMealData((prevState: any) => ({
      ...prevState,
      options: mealData.options.find((set: any) => set.id === e.target.id) ? mealData.options.filter((el: any) => el.id !== e.target.id) : [...mealData.options, choosedOptionSet]
    }))
  };


  const handleCountChange = (e: any) => {
    setMealData((prevState: any) => ({
      ...prevState,
      options: mealData.options.map((el: any) => el.id === e.target.id ? { ...el, count: e.target.value } : el)
    }))
  }

  const handleSingleOptionCountChange = ((e: any) => {
    setMealData((prevState: any) => ({
      ...prevState,
      options: mealData.options.map((el: any) => { return { ...el, count: e.target.value } })
    }))
  })

  const handleSpecialRequest = (e: any) => {
    setMealData({
      ...mealData,
      specialRequest: e.target.value
    })
  }

  const handleAddtoCart = () => {
    closeProductDetailOverlay()
    return dispatch(addToCart(mealData));
  }



  if (mealData.selectedMeal !== null) {

    const requiredOptions = mealData.selectedMeal.opt_groups.filter((e: any) => e.required === 1);
    const clickingRequiredOption = requiredOptions.some((reqObj: any) => {
      if (reqObj.opts) {
        return mealData.options.some((chekObj: any) => reqObj.opts.map((opt: any) => opt.id).includes(chekObj.id))
      }
      return false;
    })

    let totalAmount = mealData.options.reduce((acc, item) => {
      const price = parseFloat(item.price);
      const count = parseInt(item.count);
      return acc + price * count;
    }, 0).toFixed(2)

    return (<>
      <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
      <div className="fixed flex justify-center pb-28 items-start w-full h-full left-0 top-0 z-50 outline-0 overflow-y-auto">
        <div className=" z-50 mt-[20px] md:translate-y-[5%] bg-[white] text-black  w-[95%] max-w-[900px] lg:mt-0 box-border rounded" >
          <button className="absolute right-8 sm:right-14 md:right-8 mt-6  text-[white] rounded w-6 h-6" onClick={closeProductDetailOverlay}>
            <Image src={closeButtonIcon} alt="Close button icon"></Image>
          </button>
          <div className="flex flex-wrap py-6 gap-5 items-start">
            <div className="min-w-[150px] max-w-[400px] p-2">
              <img src={mealData.selectedMeal.img_url.large} alt={mealData.selectedMeal.title} className="w-full" />
            </div>
            <div className="min-w-[150px] max-w-[400px] p-2">
              <div>
                <h1 className="text-black font-bold text-2xl">{mealData.selectedMeal.title}</h1>
                <p className="text-xs">{mealData.selectedMeal.description}</p>
              </div>
              <div>
                {mealData.selectedMeal.opt_groups.map((option: any) =>
                  <div key={option.id} className="my-5">
                    <h1 className="font-bold">{option.label}:</h1>
                    {option.opts.map((choices: any) =>
                      <div key={choices.id}>
                        <input id={choices.id} type="checkbox" className="mt-3"
                          onChange={handleCheckboxChange}
                          value={choices.label}
                          name={choices.price}
                        />
                        <label htmlFor={choices.id} className="mx-2">{choices.label} ${choices.price}</label>
                        {
                          mealData.options.find((el: any) => el.id === choices.id) &&
                          <input type="number" min="1" defaultValue="1" step="1" className="border-[2px] w-[50px]" id={choices.id} onChange={handleCountChange} />
                        }
                      </div>
                    )}

                  </div>
                )}
              </div>
              <div className="mt-[20px]">
                <h1 className="font-bold">Special Request?</h1>
                <p className="italic text-sm">Add them here. We’ll do our best to make it happen.</p>
                <textarea className="bg-white w-full border-gray-400 min-h-12 resize-none border rounded-xl px-2 pb-[70px]" onChange={handleSpecialRequest} />
              </div>
              <div className="flex flex-wrap justify-between items-end">
                {mealData.selectedMeal.opt_groups.length === 0 &&
                  <>
                    <div className="mt-[20px]">
                      <div className="flex font-[20px] text-center">
                        <div className="flex flex-col items-start mt-[20px]">
                          <p className="font-bold">Select Quantity:</p>
                          <p>
                            <select className="py-1 px-3 border-2 rounded">
                              <option>1 dozen</option>
                              <option>2 dozen</option>
                              <option>3 dozen</option>
                              <option>4 dozen</option>
                            </select>
                            <span className="text-xs"> Will serve 12 people</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <button className="flex items-center justify-center rounded-3xl mt-3 px-5 md:px-10 py-3 font-bold text-base bg-[#C00A27] text-white float-right" onClick={handleAddtoCart}>
                      <Image src={carticon} className="w-[20px]" alt="Cart icon" />
                      Add to cart ${totalAmount}
                    </button>
                  </>
                }

                {clickingRequiredOption &&
                  <button className="flex items-center justify-center rounded-3xl mt-3 px-5 md:px-10 py-3 font-bold text-base bg-[#C00A27] text-white float-right" onClick={handleAddtoCart}>
                    <Image src={carticon} className="w-[20px]" alt="Cart icon" />
                    Add to cart ${totalAmount}
                  </button>
                }

                {mealData.selectedMeal.opt_groups.length !== 0 && requiredOptions.length === 0 &&
                  <button className="flex rounded-3xl items-center justify-center px-3 md:px-10 py-3 font-bold text-base bg-[#C00A27] text-white float-right m-5" onClick={handleAddtoCart}>
                    <Image src={carticon} className="w-[20px]" alt="Cart icon" /> Add to cart ${totalAmount}</button>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>)
  } else {
    return <p className="text-white bg-gray-300 w-[300px] h-[350px]">Loading...</p>
  }
}

export default ProductDetailsOverlay;






