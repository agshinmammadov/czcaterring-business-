"use client"
import PageLayout from "../../components/pagelayout";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Leftarrowicon from "../../public/media/left-arrow.png"
import Image from "next/image";
import CartProductInfo from "../../components/cartproductinfo";
import { LoadScript, Autocomplete } from '@react-google-maps/api';


export default function Checkout() {
  const cartMeals = useSelector((state: any) => state.cartReducer);
  const [selectedAddress, setSelectedAddress] = useState('');

  interface AutocompleteType {
    getPlace: () => google.maps.places.PlaceResult | null;
  }
  
  const [autocomplete, setAutocomplete] = useState<AutocompleteType | null>(null);
  
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



  const handlePlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      const formattedAddress = place?.formatted_address;
      if (formattedAddress) {
        setSelectedAddress(formattedAddress);
      }
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };
  

  const handleAutocompleteLoad = (autocomplete: any) => {
    setAutocomplete(autocomplete);
  };


  return (
    <PageLayout>
      <div className="ml-[30px] md:ml-[70px] mt-[40px]">        
          <button className="bg-[#E8E8E8] py-[10px] px-[20px] rounded-full font-bold flex items-center gap-1">
            <Image className="w-[20px]" src={Leftarrowicon} alt="Arrow image" /> Back to Home
          </button>
      </div>

      <div className="flex flex-wrap justify-around bg-[white] text-[black] min-h-[60vh] md:mx-[30px] gap-[20px]">
        <div className="flex flex-col md:w-[60%] mt-[30px] min-w-400px p-[30px]">
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
            <LoadScript
              googleMapsApiKey="AIzaSyAqLiHZtGTzYAmJkhBmZnGfOTrB5fBRSvw"
              libraries={["places"]}
            >
              <Autocomplete
                onLoad={handleAutocompleteLoad}
                onPlaceChanged={handlePlaceChanged}
                fields={['formatted_address']}
              >
                <input
                  type="text"
                  placeholder="Enter address"
                  className="border-2 rounded-full p-2 w-full"
                />
              </Autocomplete>
            </LoadScript>
          </div>
          <div className="flex flex-wrap justify-between  sm:mt-[30px]">
            <div className="flex flex-col w-fullmd:w-[45%] min-w-[300px]">
              <label htmlFor="phone">Phone<span className="text-[red]">*</span></label>
              <input onChange={handlePhoneOption} className="border-2 rounded-full p-2" id="phone" type="phone" />
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
          {cartMeals !==null && cartMeals.map((meal: any) => (
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
              <p className="absolute right-[40px] md:right-[95px]   mt-[-50px] text-sm font-bold">
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
              ${cartMeals !==null && cartMeals.reduce((acc: any, obj: any) => {
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
    </PageLayout>
  )
}
