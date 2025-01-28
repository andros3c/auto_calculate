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
interface ConfirmationModal {
  isOpen: boolean;
  onClose: () => void;
  saveOrders: () => void;
}

const SaveConfirmationModal = ({
  isOpen,
  onClose,
  saveOrders,
}: ConfirmationModal) => {
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
          <ModalHeader textAlign={"center"}>Simpan Transaksi</ModalHeader>
          <ModalCloseButton />

          <ModalBody>Simpan transaksi ini ?</ModalBody>

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
                colorScheme="green"
                px="1.5em"
                onClick={() => {
                  saveOrders();
                  setTimeout(() => {
                    onClose();
                  }, 1000);
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

export default SaveConfirmationModal;
