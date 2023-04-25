import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
}

const Container = styled(motion.div)``;

function ControlList({ children, ...rest }: Props & { [key: string]: any }) {
  return <Container {...rest}>{children}</Container>;
}

export default ControlList;
