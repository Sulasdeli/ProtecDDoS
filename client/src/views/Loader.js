import styled from 'styled-components'
import React from 'react'
import {Loader} from "rsuite";

const Container = styled.div`
  text-align: center;
  min-height: 1226px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CustomLoader = ({text}) => (
    <Container>
        <Loader content={text} vertical />
    </Container>
);

export default CustomLoader
