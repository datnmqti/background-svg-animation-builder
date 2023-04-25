import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ControlItemContainer = styled(motion.div)`
  margin-bottom: 20px;
`;

interface Props {
  children: React.ReactNode;
}

const ControlItem: React.FC<Props & { [key: string]: any }> = ({
  children,
  ...rest
}) => {
  return <ControlItemContainer {...rest}>{children}</ControlItemContainer>;
};

export default ControlItem;
