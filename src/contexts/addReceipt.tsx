"use client";
import { getCurrentDateAndDay } from "@/utils/timeAndDate";
import { cloneDeep } from "lodash";
import {
  useContext,
  createContext,
  useState,
  SetStateAction,
  Dispatch,
} from "react";

interface OrdersData {
  selectedId?: number;
  isEditMode?: boolean;
  name: string;
  unit: string;
  amount: number;
  price: number;
  totalPrice?: number;
}

interface OwnerFormField {
  value: string;
  error: string;
  label: string;
}

interface OwnerInitialValue {
  owner: OwnerFormField;
  category: OwnerFormField;
  day: OwnerFormField;
  date: OwnerFormField;
}
interface ReturnValue {
  data: OrdersData[];
  message: string;
  status: string;
}

interface AddReceiptContextValue {
  data: OwnerInitialValue;
  setData: Dispatch<SetStateAction<OwnerInitialValue>>;
  setOrdersData: Dispatch<SetStateAction<OrdersData[]>>;
  canClickNextButton: boolean;
  setCanClickNextButton: Dispatch<SetStateAction<boolean>>;
  insertOrdersDetails: ({
    transactionId,
  }: {
    transactionId: number;
  }) => Promise<ReturnValue>;
  ordersData: OrdersData[];
  setFieldState: Dispatch<SetStateAction<OrdersData>>;
  fieldState: OrdersData;
  resetFieldState: () => void;
  resetAllState: () => void;
}

const AddReceiptContext = createContext<AddReceiptContextValue | undefined>(
  undefined
);

const AddReceiptContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
  const [ordersData, setOrdersData] = useState<OrdersData[]>([]);
  const [data, setData] = useState(initialValue);
  const [canClickNextButton, setCanClickNextButton] = useState(false);
  const initialFieldState: OrdersData = {
    selectedId: 0,
    isEditMode: false,
    name: "",
    unit: "Kg",
    amount: 0,
    price: 0,
  };
  const [fieldState, setFieldState] = useState(initialFieldState);
  const resetFieldState = () => {
    setFieldState(initialFieldState);
  };
  const saveOrders = async (data: OrdersData[]) => {
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
  const insertOrdersDetails = ({
    transactionId,
  }: {
    transactionId: number;
  }) => {
    const cloneOrders = cloneDeep(ordersData);
    const cleanedData = cloneOrders.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  const context = useContext(AddReceiptContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
};

export { AddReceiptContextProvider, useAddReceiptContext };
export type { OwnerInitialValue };
