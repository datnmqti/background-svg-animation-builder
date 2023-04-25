import { createContext, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

interface ModalContextProps {
  showModal: (content: React.ReactNode) => void;
  hideModal: () => void;
}

export const ModalContext = createContext<ModalContextProps>({
  showModal: () => {},
  hideModal: () => {},
});

const ModalProvider: React.FC<Props> = ({ children }) => {
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const showModal = (content: React.ReactNode) => {
    setModalContent(content);
  };

  const hideModal = () => {
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {modalContent && (
        <div className="modal-overlay">
          <div className="modal">{modalContent}</div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
