import styled from 'styled-components'
import React from 'react'
import {Icon} from "rsuite";

const Container = styled.div`
  transition: all 150ms ease;
  font-size: 18px;
  padding: 16px;
  align-items: center;
  justify-content: space-between;
  color: white;
  background: #2d66c5;
`;

export default CardHeader = ({ title }) => (
    <Container>
        <Icon icon="home" />
        <h2>{title}</h2>
    </Container>
)