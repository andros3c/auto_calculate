import { AddReceiptContextProvider } from "@/contexts/addReceipt";

const AddReceiptLayout = ({ children }) => {
  return <AddReceiptContextProvider>{children}</AddReceiptContextProvider>;
};

export default AddReceiptLayout;
