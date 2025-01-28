import { useAddReceiptContext } from "@/contexts/addReceipt";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

const DeleteModal = ({ isOpen, onClose, onOpen, id }) => {
  const { setOrdersData } = useAddReceiptContext();
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
          <ModalHeader textAlign={"center"}>Hapus Barang</ModalHeader>
          <ModalCloseButton />

          <ModalBody>Apakah Anda ingin menghapus barang ini ?</ModalBody>

          <ModalFooter>
            <Flex w="100%" justifyContent="center" gap="2em">
              <Button
                colorScheme="orange"
                variant="light"
                px="1.5em"
                onClick={onClose}
              >
                Tidak
              </Button>
              <Button
                colorScheme="red"
                px="1.5em"
                onClick={() => {
                  setOrdersData((prev) =>
                    prev.filter((ele, idx) => idx !== id)
                  );
                  onClose();
                }}
              >
                Ya
              </Button>
            </Flex>
          </ModalFooter>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
