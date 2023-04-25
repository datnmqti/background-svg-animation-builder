import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px 18px;
  margin: 0 10px;
  background-color: #fff;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in, opacity 0.3s ease-in,
    padding 0.2s ease-in;
  opacity: 0.8;

  &:hover {
    box-shadow: -2px 3px 7px 1px #505050;
    opacity: 1;
  }
`;

const Text = styled.span`
  font-size: 14px;
  font-weight: 500;
  font-family: "Dosis", sans-serif;
  line-height: 0;
`;

const Icon = styled.i`
  margin-right: 10px;
  font-size: 20px;
  line-height: 0;
`;

interface Props {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<Props> = ({ children, icon, onClick }) => {
  return (
    <ButtonContainer onClick={onClick}>
      {icon ? <Icon>{icon}</Icon> : null}
      <Text>{children}</Text>
    </ButtonContainer>
  );
};

export default Button;
