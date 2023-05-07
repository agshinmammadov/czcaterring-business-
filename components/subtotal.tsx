
import { useSelector } from "react-redux";



const SubTotalAmount = ()=> {
    const cartMeals = useSelector((state: any) => state.cartReducer);
    
    const Amount = cartMeals !==null &&  cartMeals.reduce((acc: any, obj: any) => {
        const options = obj.options;
        options.forEach((option: any) => {
            const price = Number(option.price);
            const count = Number(option.count);
            acc += price * count;
        });
        return acc;
    }, 0).toFixed(2)
    console.log(Amount);
}
export default SubTotalAmount;