"use client";

import {
  Button,
  Flex,
  Progress,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import OwnerInformationFormPage from "./fragments/OwnerInformationFormPage";
import ListOfOrderPage from "./fragments/listOforders/ListOfOrderPage";

import { SummaryOrder } from "./fragments/SummaryOrder";

import { useSteps } from "@/hooks/useSteps";
import { useAddReceiptContext } from "@/contexts/addReceipt";
import SaveConfirmationModal from "./fragments/listOforders/SaveConfirmationModal";

const AddReceipt = () => {
  const CONTENT_LIST = [
    OwnerInformationFormPage,
    ListOfOrderPage,
    SummaryOrder,
  ];
  const { nextPage, prevPage, activePage, setActivePage } = useSteps({
    pages: CONTENT_LIST,
  });
  const Content = CONTENT_LIST[activePage];
  const progress = ((activePage + 1) * 100) / CONTENT_LIST.length;
  const { canClickNextButton, data, insertOrdersDetails, resetAllState } =
    useAddReceiptContext();

  const toast = useToast();
  const submitData = async () => {
    const { owner, category, date } = data;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME!}/api/input-orders`,
        {
          method: "POST",
          body: JSON.stringify({
            owner: owner.value,
            category: category.value,
            date: date.value,
          }),
        }
      );
      const response = await res.json();
      const transactionId = response?.data[0].id;
      const result = await insertOrdersDetails({ transactionId });
      if (result.status === "OK") {
        toast({
          title: `Berhasil`,
          status: "success",
          isClosable: true,
          position: "top",
          duration: 3000,
        });
        setTimeout(() => {
          resetAllState();
          setActivePage(0);
        }, 1200);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      toast({
        title: e,
        status: "error",
        isClosable: true,
        position: "top",
        duration: 2000,
      });
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      h="100%"
      direction="column"
      w="100%"
      py=".8em"
      justifyContent={"space-between"}
    >
      <SaveConfirmationModal
        saveOrders={submitData}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Flex direction="column" w="100%">
        <Text fontSize="small">Tambah Bon</Text>
        <Progress colorScheme={"green"} value={progress} size={"sm"} />
      </Flex>
      <Flex h="85%" w="100%" justifyContent="start">
        <Content />
      </Flex>

      <Flex w="100%" justify="space-between">
        <Button px="2em" variant={"light"} onClick={prevPage}>
          Kembali
        </Button>
        <Button
          px="2em"
          colorScheme="orange"
          isDisabled={!canClickNextButton}
          onClick={activePage === CONTENT_LIST.length - 1 ? onOpen : nextPage}
        >
          Lanjutkan
        </Button>
      </Flex>
    </Flex>
  );
};

export default AddReceipt;
