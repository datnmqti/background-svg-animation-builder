import styled from "styled-components";
import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
  onExport: () => void;
}

const Container = styled.div`
  overflow: hidden;
  min-width: 769px;
`;

const Content = styled.div`
  background: #eee;
  min-height: calc(100vh - 100px);
  padding-bottom: 20px;
`;

const Footer = styled.footer`
  display: flex;
  text-align: center;
  font-size: 13px;
  color: #000;
  justify-content: center;
  height: 40px;
  background: #eee;
`;

function Layout({ children, onExport }: Props) {
  return (
    <Container>
      <Navbar onExport={onExport} />
      <Content>{children}</Content>
      <Footer>@datnm</Footer>
    </Container>
  );
}

export default Layout;
