import React from "react";
import styled from "styled-components";

const LabelContainer = styled.label`
  font-size: 15px;
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
`;

interface Props {
  children: React.ReactNode;
}

const Label: React.FC<Props> = ({ children }) => {
  return <LabelContainer>{children}</LabelContainer>;
};

export default Label;
