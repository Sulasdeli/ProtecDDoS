import React, { Component } from 'react';
import UserForm from './UserForm'
import styled from 'styled-components'
import {Card, CardContent, CardHeader} from "@material-ui/core";

const Form = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 1000px;
`;

const PageHeader = styled.h2`
  margin-left: 15px;
`;

class HomePage extends Component {

    render() {
        return (
            <div>
                <PageHeader>
                    Home
                </PageHeader>
                <Form>
                    <Card style={{marginTop: '50px', width: '800px'}}>
                        <CardContent>
                            <UserForm/>
                        </CardContent>
                    </Card>
                </Form>
            </div>
        );
    }
}

export default HomePage;
