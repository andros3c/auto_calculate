import { useAddReceiptContext } from "@/contexts/addReceipt";
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";
import { cloneDeep } from "lodash";

interface AddListModal {
  isOpen: boolean;
  onClose: () => void;
}
interface Target {
  value: string;
  name: string;
}
export const AddListModal = ({ isOpen, onClose }: AddListModal) => {
  const {
    setOrdersData,
    ordersData,
    setFieldState,
    fieldState,
    resetFieldState,
  } = useAddReceiptContext();

  const notUsingUnit = fieldState.unit === "Tidak ada";
  const usingKg = fieldState.unit === "Kg";
  const usingPcs = fieldState.unit === "Pcs";
  const usingGram = fieldState.unit === "Gram";
  const handleChange = (e: { target: Target }) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "unit" && value === "Tidak ada") {
      return setFieldState((prev) => ({ ...prev, [name]: value, amount: 0 }));
    }
    return setFieldState((prev) => ({ ...prev, [name]: value }));
  };

  const customRound = (value: number) => {
    if (value <= 0) return 0;
    if (value > 0 && value <= 500) return 500;
    if (value > 500 && value <= 1000) return 1000;
    const remainder = Number(value % 1000);
    if (remainder < 500) {
      return value - remainder;
    }
    if (remainder > 500) {
      return value + (1000 - remainder);
    }
    return value;
  };

  const calculateTotalPrice = () => {
    if (notUsingUnit) {
      return customRound(Number(fieldState.price));
    }
    if (usingKg || usingPcs) {
      return customRound(Number(fieldState.price) * Number(fieldState.amount));
    }
    if (usingGram) {
      return customRound(
        (Number(fieldState.price) / 1000) * Number(fieldState.amount)
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent w={"100%"} borderRadius="15px">
        <Flex direction={"column"}>
          <ModalHeader>
            {fieldState.isEditMode ? "Ubah Barang" : "Masukkan Barang"}
          </ModalHeader>
          <ModalCloseButton onClick={() => resetFieldState()} />

          <ModalBody>
            <Flex direction="column" gap="1em">
              <Flex direction="column">
                <Text>nama barang</Text>
                <Input
                  type="text"
                  variant="line"
                  name="name"
                  value={fieldState.name}
                  onChange={(e) => handleChange(e)}
                />
              </Flex>
              <Flex direction="column">
                <Text>satuan</Text>
                <RadioButton
                  onChange={handleChange}
                  defaultValue={fieldState.unit}
                />
              </Flex>
              {!notUsingUnit && (
                <Flex direction="column">
                  <Text>jumlah ({fieldState.unit})</Text>
                  <Input
                    type="number"
                    variant="line"
                    value={fieldState.amount}
                    name="amount"
                    onChange={(e) => handleChange(e)}
                  />
                </Flex>
              )}
              <Flex direction="column">
                <Text>
                  harga{" "}
                  {notUsingUnit
                    ? ``
                    : `per (${
                        fieldState.unit !== "Gram" ? fieldState.unit : "Kg"
                      })`}
                </Text>
                <Input
                  type="number"
                  variant="line"
                  value={fieldState.price}
                  name="price"
                  onChange={(e) => handleChange(e)}
                />
              </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Flex w="100%" justifyContent="space-evenly">
              <Button
                colorScheme="orange"
                variant="light"
                px="1.5em"
                mr={3}
                onClick={onClose}
              >
                Kembali
              </Button>
              <Button
                colorScheme="green"
                px="1.5em"
                onClick={
                  fieldState.isEditMode
                    ? () => {
                        const copiedData = cloneDeep(ordersData);
                        copiedData[fieldState.selectedId ?? 0] = {
                          ...fieldState,
                          totalPrice: calculateTotalPrice(),
                        };
                        setOrdersData(copiedData);
                        onClose();
                        resetFieldState();
                      }
                    : () => {
                        setOrdersData((prev) => [
                          ...prev,
                          {
                            totalPrice: calculateTotalPrice(),

                            ...fieldState,
                          },
                        ]);
                        onClose();
                        resetFieldState();
                      }
                }
              >
                {fieldState.isEditMode ? "Ubah Barang" : "Tambah Barang"}
              </Button>
            </Flex>
          </ModalFooter>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

const RadioButton = ({
  onChange,
  defaultValue = "Kg",
}: {
  onChange: ({ target }: { target: Target }) => void;
  defaultValue: string;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function RadioCard(props: any) {
    const { getInputProps, getRadioProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getRadioProps();

    return (
      <Box as="label">
        <input {...input} />
        <Box
          {...checkbox}
          cursor="pointer"
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="base"
          _checked={{
            bg: "primary",
            color: "white",
            borderColor: "primary",
          }}
          _focus={{
            boxShadow: "outline",
          }}
          px={3}
          py={2}
        >
          {props.children}
        </Box>
      </Box>
    );
  }

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue,
    onChange: (value) => onChange({ target: { name: "unit", value: value } }),
  });

  const group = getRootProps();
  const options = ["Kg", "Gram", "Pcs", "Tidak ada"];

  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        );
      })}
    </HStack>
  );
};
