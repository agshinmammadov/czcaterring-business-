"use client"
import PageLayout from "../../components/pagelayout";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Leftarrowicon from "../../public/media/left-arrow.png"
import Image from "next/image";
import CartProductInfo from "../../components/cartproductinfo";
import Link from "next/link";
import GoogleAutocomplete from "../../components/GoogleAutocomplete.tsx";
import { copyToClipboard } from "../../utils/clipboard";
import CopyButtonIcon from "../../public/media/copybutton.png";
import TabComponent from "../../components/tab/tab";


const Checkout = () => {
  const cartMeals = useSelector((state: any) => state.cartReducer);
  const [addresofRestaurant, setAddresofRestaurant] = useState(null);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('delivery');
  const [tipAmount, setTipAmount] = useState<number>(0);


  const [customerDetails, setCustomerDetails] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    deliverytType: "delivery",
    phone: "",
    email: "",
    ordernotes: ""
  })

  const handleAddressSelected = (addressComponents: any) => {
    const { state, city, zip, street } = addressComponents;
    setCustomerDetails((prevDetails) => ({
      ...prevDetails,
      street: street,
      city: city,
      state: state,
      zip: zip,
    }));
  };


  const handleTabChange = (tab: string) => {
    setCustomerDetails({ ...customerDetails, deliverytType: tab })
    setActiveTab(tab);
  };


  useEffect(() => {
    const fetchAddress = async () => {
      const res = await fetch(
        "https://gist.githubusercontent.com/turalus/8890c7e87f8274d7df062b16d4818dfd/raw/90ddd447d92f37f6768a0a3569afd7093c98cbcd/er_api_response.json"
      );
      const data = await res.json();
      setAddresofRestaurant(data.data.address)
    };
    fetchAddress();
  }, []);



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

  const handleTipAmount = (e: any) => {
    setTipAmount(e.target.value)
  }

  const subTotalAmount = cartMeals !== null && cartMeals.reduce((acc: any, obj: any) => {
    const options = obj.options;
    options.forEach((option: any) => {
      const price = Number(option.price);
      const count = Number(option.count);
      acc += price * count;
    });
    return acc;
  }, 0).toFixed(2);
  const tax = (subTotalAmount * 8.86 / 100).toFixed(2);
  const totalAmount = (parseFloat(subTotalAmount) + parseFloat(tax) + Number(tipAmount)).toFixed(2) ;


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
        <form>
          <div className="flex flex-wrap">
            <div className="flex flex-col md:w-[60%] min-w-400px p-[30px]">
              <h1 className="font-bold">BILLING AND SHIPPING DETAILS</h1>
              <div className="w-[150px] h-[3px] bg-[red]"></div>

              <div className="mt-[30px] flex flex-wrap justify-between">
                <div className="flex flex-col w-full md:w-[45%] min-w-300px">
                  <label htmlFor="firstname">First name <span className="text-[red]">*</span></label>
                  <input onChange={handleFirstName} className="border-2 rounded-full p-2" id="firstname" type="text" required />
                </div>
                <div className="flex flex-col w-full md:w-[45%] min-w-300px">
                  <label htmlFor="lastname">Last name <span className="text-[red]">*</span></label>
                  <input onChange={handleLastName} className="border-2 rounded-full p-2" id="lastname" type="text" required />
                </div>
              </div>
              <div className="w-full min-w-300px mt-[30px] h-80px">
                <TabComponent activeTab={activeTab} onTabChange={handleTabChange} />
                {activeTab === 'delivery' && (
                  <div className="mt-3 ml-3 w-full">
                    <p>Address<span className="text-[red]">*</span></p>
                    <GoogleAutocomplete onAddressSelected={handleAddressSelected} />
                  </div>
                )}
                {activeTab === 'takeout' && (
                  <div className="flex pr-2 mt-10 ml-3 border bg-gray-100 p-2 rounded-lg w-fit">
                    <p>{addresofRestaurant !== null && addresofRestaurant}</p>
                    <button style={{ position: 'relative' }} onClick={() => handleCopyClick(addresofRestaurant)}>
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
                    </button>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap justify-between  sm:mt-[40px] mt-20">
                <div className="flex flex-col w-full md:w-[45%] min-w-[300px] ">
                  <label htmlFor="phone">Phone<span className="text-[red]">*</span></label>
                  <input onChange={handlePhoneOption} className="border-2 rounded-full p-2 w-full" id="phone" type="phone" required />
                </div>
                <div className="flex flex- flex-col w-full md:w-[45%] min-w-[300px]">
                  <label htmlFor="email">Email<span className="text-[red]">*</span></label>
                  <input onChange={handleEmailoption} className="border-2 rounded-full p-2" id="email" type="email" required />
                </div>
              </div>
              <div className="w-[90%] min-w-300px md:w-50%"></div>
              <p className="mt-[20px]">ADDITIONAL INFORMATION</p>
              <div className="w-[150px] h-[3px] bg-[red]"></div>
              <p className="mt-[30px]">Order notes</p>
              <input onChange={handleOrderOption} type="text" className="border-2 rounded-xl px-2 pb-[90px]" placeholder="Notes about your order, e.g. special notes for delivery." />
            </div>

            <div className="md:w-[35%] min-w-[300px] w-full pl-[30px]">
              <p className="font-bold mt-[30px]">YOUR ORDER</p>
              <div className="w-[150px] h-[3px] bg-[red]"></div>
              <div className=" bg-[#F5F5F5] rounded-xl py-[15px] px-[30px] my-9 mr-6 md:mr-0">
                <table className="flex flex-col w-full border-b-2  mt-[30px]">
                  <thead className="flex justify-between border-b-2">
                    <th>Product</th>
                    <th>Total</th>
                  </thead>
                  <tbody>
                    {cartMeals !== null && cartMeals.map((meal: any) => (
                      <tr className="flex justify-between items-center w-full">
                        <td className="w-full">
                          <CartProductInfo
                            key={meal.selectedMeal.id}
                            ProductID={meal.selectedMeal.id}
                            CartproductTitle={meal.selectedMeal.title}
                            CartProductOption={meal.options}
                            cartContainerWrapper_classname="flex py-[5px]"
                            cartProductTitle_classname="text-base"
                            cartContainerProductDetail_classname="flex flex-col justify-start mt-[5px]"
                            cartContainerProductDetailOption_classname="text-xs"
                            removeBtn_classname="hidden"
                          />
                        </td>
                        <td className="w-full flex justify-end">
                          {meal.options.reduce((acc: any, item: any) => {
                            const price = parseFloat(item.price);
                            const count = parseInt(item.count);
                            return acc + price * count;
                          }, 0).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {cartMeals !== null && cartMeals.length !== 0 ?
                  <div>
                    <p className="border-b-2 w-full flex mt-3 py-3 justify-between">
                      <p><strong>Subtotal</strong></p>
                      <p>${subTotalAmount}</p>
                    </p>
                    <p className="border-b-2 w-full flex mt-3 py-3 justify-between">
                      <p><strong>Tax</strong></p>
                      <p>${tax}</p>
                    </p>
                    {tipAmount > 0 && 
                      <p className="border-b-2 w-full flex mt-3 py-3 justify-between">
                        <p><strong>Tip</strong></p>
                        <p>${tipAmount}</p>
                      </p>}

                    <p className="border-b-2 w-full flex mt-3 py-3 justify-between">
                      <p><strong>Total</strong></p>
                      <p><strong>${totalAmount}</strong></p>
                    </p>
                    <p className="flex flex-col w-full mt-3">
                      <p className="opacity-70"><label htmlFor="tipamount">Tip amount</label></p>
                      <p><input className="rounded-full px-3 py-2 mt-2 border-2  w-full" onBlur={handleTipAmount} id="tipamount" type="number" placeholder="Tip amount" defaultValue={0} min={0} /></p>
                    </p>
                    <p className="flex flex-col w-full mt-3">
                      <p className="opacity-70"><label htmlFor="promocode">Promo code</label></p>
                      <p><input className="rounded-full px-3 py-2 mt-2 border-2  w-full" id="promocode" type="number" placeholder="Promo code" defaultValue={0} min={0} /></p>
                    </p>
                    <button className="py-3 px-6 mt-6 bg-[#C00A27] text-white rounded-full w-full">Place order</button>
                  </div> : <div className="p-3"></div>
                }
              </div>
            </div>
          </div>
        </form>
      </div>
    </PageLayout >
  )
}
export default Checkout;
