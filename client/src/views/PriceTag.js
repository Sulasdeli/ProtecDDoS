import styled from 'styled-components'
import React from 'react'
import {Tag} from "rsuite";

const Container = styled.div`
  float: right;
  margin-bottom: 10px;
  margin-right: 10px;
`;

const styles = {
    green: {
        background: 'linear-gradient(60deg, #66bb6a, #43a047)',
        color: "white"
    },
    yellow: {
        background: 'linear-gradient(60deg, #ffa726, #fb8c00)',
        color: "white"
    },
    red: {
        background: 'linear-gradient(60deg, #ef5350, #e53935)',
        color: "white"
    },
};

const getStyle = (index, pageNumber) => {
    return pageNumber === 1 ? (index === 0 ? styles.green: styles.yellow) : styles.red
};

const PriceTag = ({service, index, pageNumber}) => (
    <Container>
        <Tag style={getStyle(index, pageNumber)}>{service.price + ' ' + service.currency}</Tag>
    </Container>
);

export default PriceTag