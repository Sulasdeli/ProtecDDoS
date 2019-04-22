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
`;

const CardHeader = ({ title , iconName, backgroundColor}) => (
    <Container style={{background: backgroundColor}}>
        &nbsp;
        &nbsp;
        <Icon icon={iconName} size="2x" />
        &nbsp;
        &nbsp;
        <h2>{title}</h2>
    </Container>
);

export default CardHeader