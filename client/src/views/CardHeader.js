import styled from 'styled-components'
import React from 'react'
import {Icon} from "rsuite";

const Container = styled.div`
  font-size: 18px;
  padding: 5px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  color: white;
  background: #34c3ff;
`;

const CardHeader = ({ title }) => (
    <Container>
        &nbsp;
        <Icon icon="user-info" size="2x" />
        &nbsp;
        <h2>{title}</h2>
    </Container>
);

export default CardHeader