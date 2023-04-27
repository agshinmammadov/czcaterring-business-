import React from "react";
import { Provider } from "react-redux";
import configureStore from "@/redux/store";

interface ProviderProps {
    children: React.ReactNode;
}

const ProviderWrapper: React.FC<ProviderProps> = ({ children }) => {
    const store = configureStore();

    return (
        <div>
            <Provider store={store}>
                {children}               
            </Provider>
        </div>
    );
};


export default ProviderWrapper;


