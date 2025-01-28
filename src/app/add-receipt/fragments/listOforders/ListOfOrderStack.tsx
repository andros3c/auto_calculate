import { formatCurrency } from "@/utils/formatCurrency";
import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { capitalize, startCase, toLower } from "lodash";
import { useState } from "react";
import { AddListModal } from "./AddOrEditListModal";
import { useAddReceiptContext } from "@/contexts/addReceipt";
import DeleteModal from "./DeleteModal";
import { colors } from "@/app/theme/foundations/colors";


export const ListOfOrderStack = () => {
  const [highligted, setHighligted] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  const handleClick = (id: number) => {
    if (id === highligted && clickCount < 2) {
      setClickCount((prev) => prev + 1);
    } else {
      setClickCount(1);
    }
    setHighligted(id);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState(0);
  const { ordersData, setFieldState } = useAddReceiptContext();

  return (
    <Flex h="100%" w="100%" direction={"column"} gap="1em">
      <DeleteModal
        isOpen={isOpenDeleteModal}
        onClose={onCloseDeleteModal}
        id={selectedItem}
      />
      <AddListModal isOpen={isOpen} onClose={onClose} />
      <Flex direction={"column"} overflowY={"scroll"} w="100%" px=".3em">
        {ordersData.length > 0 ? (
          <Flex minHeight={"50vh"} w="100%" direction={"column"} gap=".5em">
            {ordersData.map((ele, idx) => {
              const { name, amount, unit, price, totalPrice } = ele;

              return (
                <Flex
                  key={idx}
                  justifyContent="space-between"
                  px="1em"
                  py=".5em"
                  border={idx === highligted ? "none" : "0.1px #313131 solid"}
                  bgColor={
                    idx === highligted ? colors.myColor.blue[500] : "none"
                  }
                  h="max-content"
                  w="100%"
                  borderRadius={"10px"}
                  onClick={() => handleClick(idx)}
                  textColor={idx === highligted ? "white" : "quartinery"}
                  position="relative"
                >
                  <Flex
                    position="absolute"
                    zIndex={12}
                    w="100%"
                    top={0}
                    borderRadius={"10px"}
                    left={0}
                    h="100%"
                    justifyContent="space-around"
                    alignItems={"center"}
                    textColor="white"
                    visibility={
                      clickCount === 2 && idx === highligted
                        ? "visible"
                        : "hidden"
                    }
                  >
                    <Flex
                      w="50%"
                      borderStartRadius={"10px"}
                      h="100%"
                      bgColor="rgba(255, 162, 52, 85%)"
                      justify="center"
                    >
                      <Text
                        as="button"
                        fontWeight="bold"
                        fontSize="large"
                        onClick={() => {
                          onOpen();
                          setFieldState({
                            ...ordersData[idx],
                            isEditMode: true,
                            selectedId: idx,
                          });
                        }}
                      >
                        Edit
                      </Text>
                    </Flex>
                    <Flex
                      borderEndRadius={"10px"}
                      w="50%"
                      h="100%"
                      bgColor="rgba(255, 52, 52, 85%)"
                      justify="center"
                      onClick={() => {
                        setSelectedItem(idx);
                        onOpenDeleteModal();
                      }}
                    >
                      <Text as="button" fontWeight="bold" fontSize="large">
                        Hapus
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex>{idx + 1}</Flex>
                  <Flex direction="column">
                    <Flex>
                      <Text>{startCase(toLower(name))}</Text>
                    </Flex>
                    <Flex>
                      <Text>jumlah</Text>
                    </Flex>
                  </Flex>
                  <Flex direction="column">
                    {unit !== "Tidak ada" ? (
                      <Flex>
                        <Text>
                          {amount + capitalize(unit)} &times;{" "}
                          {formatCurrency(price)}
                        </Text>
                      </Flex>
                    ) : (
                      <Flex flex={1}></Flex>
                    )}

                    <Flex>
                      <Text fontWeight="bold">
                        Rp{formatCurrency(totalPrice ?? 0)}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              );
            })}
          </Flex>
        ) : (
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            p={"2em"}
            h={"55vh"}
            bgColor={colors.myColor.black[100]}
          >
            Belum Ada Pesanan
          </Flex>
        )}
      </Flex>
      <Flex w="100%" justifyContent="flex-end">
        <Button size="sm" onClick={onOpen}>
          Tambah Pesanan
        </Button>
      </Flex>
    </Flex>
  );
};
