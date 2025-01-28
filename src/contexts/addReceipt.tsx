"use client";
import { getCurrentDateAndDay } from "@/utils/timeAndDate";
import { cloneDeep } from "lodash";
import { useContext, createContext, useState } from "react";

const AddReceiptContext = createContext();

const AddReceiptContextProvider = ({ children }) => {
  const { day, date } = getCurrentDateAndDay();

  const initialValue = {
    owner: { value: "", error: "", label: "pemilik" },
    category: { value: "", error: "", label: "kategori" },

    day: { value: day, error: "", label: "hari" },
    date: {
      value: date,
      error: "",
      label: "tanggal",
    },
  };
  const [ordersData, setOrdersData] = useState([]);
  const [data, setData] = useState(initialValue);
  const [canClickNextButton, setCanClickNextButton] = useState(false);
  const initialFieldState = {
    selectedId: "",
    isEditMode: false,
    name: "",
    unit: "Kg",
    amount: "",
    price: "",
  };
  const [fieldState, setFieldState] = useState(initialFieldState);
  const resetFieldState = () => {
    setFieldState(initialFieldState);
  };
  const saveOrders = async (data) => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/input-orders-details",
        {
          method: "POST",
          body: JSON.stringify({
            data,
          }),
        }
      );
      const response = await res.json();
      return response;
    } catch (e) {
      throw e;
    }
  };
  const insertOrdersDetails = ({ transactionId }) => {
    const cloneOrders = cloneDeep(ordersData);
    const cleanedData = cloneOrders.map(
      ({ isEditMode, selectedId, totalPrice, ...rest }) => ({
        ...rest,
        total: totalPrice,
        transaction_id: transactionId,
      })
    );
    const response = saveOrders(cleanedData);
    return response;
  };
  const resetAllState = () => {
    setFieldState(initialFieldState);
    setData(initialValue);
    setOrdersData([]);
    setCanClickNextButton(false);
  };
  return (
    <AddReceiptContext.Provider
      value={{
        data,
        setData,
        setOrdersData,
        canClickNextButton,
        setCanClickNextButton,
        insertOrdersDetails,
        ordersData,
        setFieldState,
        fieldState,
        resetFieldState,
        resetAllState,
      }}
    >
      {children}
    </AddReceiptContext.Provider>
  );
};

const useAddReceiptContext = () => {
  const state = useContext(AddReceiptContext);
  return state;
};

export { AddReceiptContextProvider, useAddReceiptContext };
