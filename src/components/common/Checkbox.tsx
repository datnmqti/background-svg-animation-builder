import React, { useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import ControlItem from "./ControlItem";
import Label from "./Label";
import Input from "./Input";

const CheckboxInput = styled.input`
  margin-left: 20px;
  width: 15px;
  height: 15px;
  cursor: pointer;
`;

const ControlItemInner = styled.div`
  display: flex;
  align-items: center;

  label {
    margin-bottom: 0;
  }
`;

const WrapInput = styled.div`
  margin-top: 0.5em;
`;

interface CheckboxProps {
  label: string;
  value: boolean | number;
  onChange: (value: boolean | number) => void;
}

const Checkbox: React.FC<CheckboxProps & { [key: string]: any }> = ({
  label,
  value,
  onChange,
  ...rest
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = Boolean(event.target.checked);
    onChange(isChecked);
  };

  return (
    <ControlItem {...rest}>
      <ControlItemInner>
        <Label>{label}</Label>
        <CheckboxInput
          type="checkbox"
          checked={typeof value === "boolean" ? value : false}
          onChange={handleChange}
        />
      </ControlItemInner>
      {typeof value === "number" ? (
        <WrapInput>
          <Input
            type="number"
            value={Number(value)}
            onChange={(e) => {
              onChange(Number(e.target.value));
            }}
          />
        </WrapInput>
      ) : null}
    </ControlItem>
  );
};

export default Checkbox;
