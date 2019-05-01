import styled from 'styled-components'
import React from 'react'
import {Icon} from "rsuite";

const Container = styled.div`
  font-size: 18px;
  padding: 15px;
  align-items: center;
  justify-content: space-between;
  color: white;
  background: rgba(0,0,0,0.98);
  height: 10%;
`;

const GithubLink = styled.a`
  color: white;
`;

export default HeaderContent => (
    <Container>
        <span>DDoS Protection Advisor</span>
        <GithubLink href="https://github.com/Sulasdeli/BA" target="_blank" >
            <Icon style={{float: 'right'}} icon="github" size='lg'/>
        </GithubLink>
    </Container>
)