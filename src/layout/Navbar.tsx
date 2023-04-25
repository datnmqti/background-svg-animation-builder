import { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { TbFileExport } from "react-icons/tb";
import styled from "styled-components";
import FAQContent from "../components/FaqContent";
import Modal from "../components/Modal";
import Button from "../components/common/Button";

const Container = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #606060;
  height: 60px;
  padding: 0 30px;
`;

const Logo = styled.h1`
  font-size: 20px;
  color: #fff;
  letter-spacing: 0.12em;
`;

const ActionList = styled.div`
  display: flex;
  margin: 0 -10px;
`;

interface Props {
  onExport: () => void;
}

const Navbar: React.FC<Props> = ({ onExport }) => {
  const [isFAQVisible, setFAQVisible] = useState(false);

  return (
    <Container>
      <Logo>BG SVG Animation Builder</Logo>
      <ActionList>
        <Button icon={<FaQuestionCircle />} onClick={() => setFAQVisible(true)}>
          FAQ
        </Button>
        <Button icon={<TbFileExport />} onClick={onExport}>
          Export
        </Button>
      </ActionList>

      <Modal isOpen={isFAQVisible} onClose={() => setFAQVisible(false)}>
        <FAQContent />
      </Modal>
    </Container>
  );
};

export default Navbar;
