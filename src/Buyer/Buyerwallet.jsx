import React, { useEffect, useState } from "react";
import "./BuyerWallet.css"; // Assuming you save your CSS in a file named BuyerWallet.css
import Buyernav from "./Common/Buyernav";
import { useSelector } from "react-redux";
import { buyer_walletapi } from "../Api/Userapi";

function BuyerWallet() {
    const buyer_id=useSelector((state)=>state.useReducer.user)
    const  [wallet,setWallet]=useState()
    console.log(buyer_id,'--------')

    useEffect(() => {
      buyer_walletapi(buyer_id)
          .then((response) => {
              setWallet(response.data.wallet_amount);
              console.log(response.data.wallet_amount,'99999999999')
          })
          .catch((error) => {
              console.log(error.message);
          });
  }, []);
  
  return (
    <>
    <Buyernav/>
      <div className="cardxxx">
        <p className="heading text-3xl">WALLET</p>
        <h1 className="text-gray-500 text-2xl">${wallet}</h1>
        <p>Powered By</p>
        <p>Uiverse</p>
      </div>
    </>
  );
}

export default BuyerWallet;
