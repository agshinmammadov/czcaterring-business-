"use client"
import PageLayout from "../../components/pagelayout";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Leftarrowicon from "../../public/media/left-arrow.png"
import Image from "next/image";
import CartProductInfo from "../../components/cartproductinfo";
import Link from "next/link";
import GoogleAutocomplete from "../../components/GoogleAutocomplete.tsx";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { copyToClipboard } from "../../utils/clipboard";
import CopyButtonIcon from "../../public/media/copybutton.png";
import '../../styles/tabs.css'


export default function Checkout() {
  const cartMeals = useSelector((state: any) => state.cartReducer);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const handleAddressSelected = (addressComponents: any) => {
    console.log('Address components:', addressComponents);
  };


  const [customerDetails, setCustomerDetails] = useState({
    firstName: "",
    lastName: "",
    mainAddress: "",
    optionalAdress: "",
    city: "",
    state: "",
    zipcode: "",
    deliverytType: "",
    phone: "",
    email: "",
    ordernotes: ""
  })

  const handleFirstName = (e: any) => {
    setCustomerDetails({
      ...customerDetails,
      firstName: e.target.value
    })
  }
  const handleLastName = (e: any) => {
    setCustomerDetails({
      ...customerDetails,
      lastName: e.target.value
    })
  }

  const handlePhoneOption = (e: any) => {
    setCustomerDetails({
      ...customerDetails,
      phone: e.target.value
    })
  }
  const handleEmailoption = (e: any) => {
    setCustomerDetails({
      ...customerDetails,
      email: e.target.value
    })
  }

  const handleOrderOption = (e: any) => {
    setCustomerDetails({
      ...customerDetails,
      ordernotes: e.target.value
    })
  }

  const handleCopyClick = async (e: any) => {
    await copyToClipboard(e);
    setIsTooltipVisible(true);
    setTimeout(() => {
      setIsTooltipVisible(false);
    }, 2000);
  };
  const AddresofRestaurant = "Memo Shish Kebab | 100 West 23rd, New York, NY 10011 | (212) 381 2115"

  return (
    <PageLayout>
      <div className="flex flex-col flex-wrap justify-around bg-[white] text-[black] min-h-[60vh] md:mx-[30px] gap-[20px]">
        <div className="pl-[30px] mt-[40px]">
          <Link href="/">
            <button className="bg-[#E8E8E8] py-[10px] px-[20px] rounded-full font-bold flex items-center gap-1">
              <Image className="w-[20px]" src={Leftarrowicon} alt="Arrow image" /> Back to Home
            </button>
          </Link>
        </div>
        <div className="flex flex-wrap">
          <div className="flex flex-col md:w-[60%] min-w-400px p-[30px]">
            <h1 className="font-bold">BILLING AND SHIPPING DETAILS</h1>
            <div className="w-[150px] h-[3px] bg-[red]"></div>

            <div className="mt-[30px] flex flex-wrap justify-between">
              <div className="flex flex-col w-full md:w-[45%] min-w-300px">
                <label htmlFor="firstname">First name <span className="text-[red]">*</span></label>
                <input onChange={handleFirstName} className="border-2 rounded-full p-2" id="firstname" type="text" />
              </div>
              <div className="flex flex-col w-full md:w-[45%] min-w-300px">
                <label htmlFor="lastname">Last name <span className="text-[red]">*</span></label>
                <input onChange={handleLastName} className="border-2 rounded-full p-2" id="lastname" type="text" />
              </div>
            </div>
            <div className="w-full min-w-300px mt-[30px]">
              <div>
                <Tabs className="flex flex-col w-full h-[70px]">
                  <TabList className="flex w-full justify-center">
                    <Tab className="w-1/2 cursor-pointer text-center border-b-2" >Delivery</Tab>
                    <Tab className="w-1/2 cursor-pointer text-center border-b-2">Takeout</Tab>
                  </TabList>

                  <TabPanel className="mt-3 ml-3">
                    <p>Address<span className="text-[red]">*</span></p>
                    <GoogleAutocomplete onAddressSelected={handleAddressSelected} />
                  </TabPanel>

                  <TabPanel className="mt-3 ml-3 border bg-gray-100 p-2 rounded-lg w-fit">
                    <p className="flex pr-2">{AddresofRestaurant}
                      <button style={{ position: 'relative' }} onClick={() => handleCopyClick(AddresofRestaurant)}>
                        <Image src={CopyButtonIcon} alt="Copy button Icon" className="w-6 h-6 ml-3 opacity-60"></Image>
                        {isTooltipVisible && (
                          <span
                            style={{
                              position: 'absolute',
                              top: '-30px',
                              backgroundColor: 'black',
                              color: 'white',
                              borderRadius: '4px',
                              padding: '5px',
                              fontSize: '12px',
                            }}
                          >
                            Copied!
                          </span>
                        )}
                      </button></p>
                  </TabPanel>
                </Tabs>
              </div>
            </div>
            <div className="flex flex-wrap justify-between  sm:mt-[40px] mt-20">
              <div className="flex flex-col w-full md:w-[45%] min-w-[300px] ">
                <label htmlFor="phone">Phone<span className="text-[red]">*</span></label>
                <input onChange={handlePhoneOption} className="border-2 rounded-full p-2 w-full" id="phone" type="phone" />
              </div>
              <div className="flex flex- flex-col w-full md:w-[45%] min-w-[300px]">
                <label htmlFor="email">Email<span className="text-[red]">*</span></label>
                <input onChange={handleEmailoption} className="border-2 rounded-full p-2" id="email" type="email" />
              </div>
            </div>
            <div className="w-[90%] min-w-300px md:w-50%"></div>
            <p className="mt-[20px]">ADDITIONAL INFORMATION</p>
            <div className="w-[150px] h-[3px] bg-[red]"></div>
            <p className="mt-[30px]">Order notes</p>
            <input onChange={handleOrderOption} type="text" className="border-2 rounded-xl px-2 pb-[90px]" placeholder="Notes about your order, e.g. special notes for delivery." />
          </div>

          <div className="md:w-[35%] min-w-[300px] w-full px-[30px]">
            <p className="font-bold mt-[30px]">YOUR ORDER</p>
            <div className="w-[150px] h-[3px] bg-[red]"></div>
            <div className="flex w-full justify-between px-[10px] md:px-[30px] py-[10px] border-b-2 bg-[#F5F5F5] rounded-xl mt-[30px]">
              <p className="font-bold">Product</p>
              <p className="font-bold">Total</p>
            </div>
            {cartMeals !== null && cartMeals.map((meal: any) => (
              <div className=" border-b-2 bg-[#F5F5F5]" key={meal.selectedMeal.id}>
                <CartProductInfo
                  ProductID={meal.selectedMeal.id}
                  CartproductTitle={meal.selectedMeal.title}
                  CartProductOption={meal.options}
                  cartContainerWrapper_classname="flex px-[10px] py-[5px]"
                  cartProductTitle_classname="text-base"
                  cartContainerProductDetail_classname="flex flex-col justify-start m-[5px]"
                  cartContainerProductDetailOption_classname="text-xs"
                  removeBtn_classname="hidden"
                />
                <p className="absolute right-[40px] md:right-[145px]   mt-[-50px] text-sm font-bold">
                  $ {meal.options.reduce((acc: any, item: any) => {
                    const price = parseFloat(item.price);
                    const count = parseInt(item.count);
                    return acc + price * count;
                  }, 0).toFixed(2)}
                </p>
              </div>
            ))}
            <div className="flex justify-between p-[30px]">
              <h1 className="font-bold text-base">Subtotal:</h1>
              <p className="font-bold text-base  h-[20px]">
                ${cartMeals !== null && cartMeals.reduce((acc: any, obj: any) => {
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
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
