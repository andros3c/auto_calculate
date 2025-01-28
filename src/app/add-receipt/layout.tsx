import { AddReceiptContextProvider } from "@/contexts/addReceipt";

const AddReceiptLayout = ({ children }: { children: React.ReactNode }) => {
  return <AddReceiptContextProvider>{children}</AddReceiptContextProvider>;
};

export default AddReceiptLayout;
