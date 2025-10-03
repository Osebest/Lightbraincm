import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import type { ModalProps } from "@chakra-ui/react";

export interface ModalPopProps
  extends Pick<ModalProps, "isOpen" | "size" | "onClose"> {
  closeOnOverlayClick?: boolean;
  title: string;
  className?: string;
}

const ModalPop = ({
  isOpen,
  onClose,
  title,
  closeOnOverlayClick = false,
  size = "xl",
  children,
  className,
}: React.PropsWithChildren<ModalPopProps>) => {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        closeOnOverlayClick={closeOnOverlayClick}
        motionPreset="slideInRight"
        scrollBehavior={"inside"}
        size={size}
      >
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent
          className={`${className} dark:bg-navy-900 dark:text-white`}
        >
          <ModalHeader className="capitalize">{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ModalPop;
