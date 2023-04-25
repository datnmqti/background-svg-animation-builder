import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import styled from "styled-components";
import { AiFillCloseCircle } from "react-icons/ai";

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 50;
`;

const CenteredContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: center;
  display: flex;
  justify-content: center;
  height: 550px;
  width: 700px;
  padding: 30px 20px 20px;
  border-radius: 20px;
  background-color: #e2e2e2;
  border: 5px solid #525252;
  z-index: 999;
  overflow: hidden;
`;

const DialogBox = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const DialogInner = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 6px;
  right: 10px;
  font-size: 30px;
  background-color: transparent;
  opacity: 0.6;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s ease-in;

  &:hover {
    opacity: 1;
  }
`;

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<Props> = ({ isOpen, onClose, children }) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        onClose={onClose}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <Dialog.Overlay as={Overlay} />
        <CenteredContainer>
          <CloseButton onClick={onClose}>
            <AiFillCloseCircle />
          </CloseButton>
          <DialogBox>
            <DialogInner>{children}</DialogInner>
          </DialogBox>
        </CenteredContainer>
      </Dialog>
    </Transition>
  );
};

export default Modal;
