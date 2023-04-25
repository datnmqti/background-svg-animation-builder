import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import styled from 'styled-components';
import ControlItem from './ControlItem';
import Label from './Label';

const SliderInput = styled.input`
  width: 100%;
  height: 2px;
  -webkit-appearance: none;
  background: #ddd;
  border-radius: 5px;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  &:hover {
    opacity: 1;
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: #fff;
    cursor: grabbing;
    border-radius: 50%;
    border: 1px solid #ccc;
  }
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: #fff;
    cursor: grabbing;
    border-radius: 50%;
    border: 1px solid #ccc;
  }
`;

interface SliderBarProps {
  label?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

const LabelCustom = styled(Label)`
  display: flex;
`;

const Small = styled.small`
  margin-left: 7px;
  font-weight: 100;
`;

const SliderBar: React.FC<SliderBarProps & { [key: string]: any }> = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
  ...rest
}) => {
  const [sliderValue, setSliderValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSliderValue(value);
  }, [value]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <ControlItem {...rest}>
      <LabelCustom>
        {label}
        <Small>{value}</Small>
      </LabelCustom>
      <SliderInput
        type="range"
        ref={inputRef}
        value={sliderValue}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
      />
    </ControlItem>
  );
};

export default SliderBar;
