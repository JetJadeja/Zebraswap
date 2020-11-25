import React from "react";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const SelectToken = React.memo(({ isOpen, onOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay>
        <ModalContent>
          <Box />
          <ModalCloseButton />
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
});

export default SelectToken;
