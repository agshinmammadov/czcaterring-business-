import React, { useEffect } from "react";
import { FC } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/actions/action";
import carticon from "../../media/cart-icon.png"
import Image from "next/image";

type MealOption = {
  optionName: string,
  price: any,
  count: any ,
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
      setMealData((prevState:any) => ({
        ...prevState,
        options: [...prevState.options, { count: 1, price: prevState.selectedMeal.price }]
      }));
    }
  }, [mealData.selectedMeal]);


  const handleCheckboxChange = (e: any) => {
    const choosedOptionSet = { optionName: e.target.value, price: e.target.name, count: 1, id: e.target.id }
    setMealData((prevState:any)=>({
      ...prevState,
      options: mealData.options.find((set: any) => set.id === e.target.id) ? mealData.options.filter((el: any) => el.id !== e.target.id) : [...mealData.options, choosedOptionSet]
    }))
  };


  const handleCountChange = (e: any) => {
    setMealData((prevState:any)=>({
      ...prevState,
      options: mealData.options.map((el: any) => el.id === e.target.id ? { ...el, count: e.target.value } : el)
    }))
  }

  const handleSingleOptionCountChange = ((e: any) => {
    setMealData((prevState:any)=>({
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
    dispatch(addToCart(mealData));
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
      <div className="fixed flex justify-center items-center w-full h-full left-0 top-0 z-50 outline-0 overflow-y-auto">
        <div className="z-50 bg-white text-black sm:w-[80%] w-[90%] sm:w-[70%] xl:min-[700px] lg:mt-[150px] xl:mt-[50px] h-auto mt-[350px] lg:mt-0 box-border rounded" >
          <button className="float-right m-5 bg-gray-600 text-white w-6 h-8 rounded-md" onClick={closeProductDetailOverlay}>X</button>
          <div className="flex flex-wrap p-5 gap-5">
            <div className="min-w-[200px]">
              <img src={mealData.selectedMeal.img_url.large} alt={mealData.selectedMeal.title} className="w-full" />
            </div>
            <div className="min-w-[200px]">
              <div>
                <h1 className="text-black font-bold text-4xl">{mealData.selectedMeal.title}</h1>
                <p>{mealData.selectedMeal.description}</p>
              </div>
              <div>
                {mealData.selectedMeal.opt_groups.map((option: any) =>
                  <div key={option.id} className="my-5">
                    <h1 className="font-bold">{option.label}:</h1>
                    {option.opts.map((choices: any) =>
                      <div key={choices.id}>
                        <input id={choices.id} type="checkbox" className=""
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
              <div>
                <h1 className="font-bold">Special Request?</h1>
                <p className="italic">Add them here. We’ll do our best to make it happen.</p>
                <textarea className="bg-white w-full border-2 border-gray-400 rounded-[20px] min-h-12 resize-none" onChange={handleSpecialRequest} />
              </div>
              {mealData.options.length !== 0 && mealData.selectedMeal.opt_groups.length !== 0 &&
                <h1 className="font-bold"> Order total: <span className="text-[#cdaa7c] font-bold">
                  ${totalAmount}
                </span>
                </h1>
              }
              {mealData.selectedMeal.opt_groups.length === 0 &&
                <>
                  <h1 className="font-bold"> Order total: <span className="text-[#cdaa7c] font-bold">${totalAmount}</span> </h1>
                  <div className="flex font-[20px] text-center">
                    <input className="border-2 w-[70px] h-[60px] border" defaultValue="1" type='number' step="1" min="1" onChange={handleSingleOptionCountChange} /></div>
                  <button className="flex rounded-3xl px-10 py-3 font-bold text-base bg-[#C00A27] text-white float-right m-5" onClick={handleAddtoCart}><Image src={carticon} className="w-[20px]" alt="Cart icon" /> Add to cart</button>
                </>
              }

              {clickingRequiredOption &&
                <button className="flex rounded-3xl px-10 py-3 font-bold text-base bg-[#C00A27] text-white float-right m-5" onClick={handleAddtoCart}>
                  <Image src={carticon} className="w-[20px]" alt="Cart icon" /> Add to cart</button>
              }

              {mealData.selectedMeal.opt_groups.length !== 0 && requiredOptions.length === 0 &&
                <button className="flex rounded-3xl px-10 py-3 font-bold text-base bg-[#C00A27] text-white float-right m-5" onClick={handleAddtoCart}>
                  <Image src={carticon} className="w-[20px]" alt="Cart icon" /> Add to cart</button>
              }
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






