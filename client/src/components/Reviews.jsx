import React, { Component } from 'react';
import styled from 'styled-components'
import {Divider, Icon} from "rsuite";
import {Fab, Typography} from "@material-ui/core"

const Container = styled.span`
    justify-content: space-between;
    display: flex;
    align-items: center;
`;

const EmptyList = styled.div`
    display: flex;
    justify-content: center;
    padding: 30px;
`;

class Reviews extends Component {
    constructor() {
        super();
        this.state = {
            reviews: null,
            isLoading: false
        };
    }

    render() {
        return (
            <div>
                <Container>
                    <Typography variant="h4" style={{fontWeight: 'bold'}}>
                        Reviews
                    </Typography>
                    <Fab style={{background: '#41a5f5'}} size="medium" aria-label="Add">
                        <Icon icon="plus" style={{color: "white"}} size={"lg"}/>
                    </Fab>
                </Container>
                <Divider/>
                { this.state.reviews === null ? (
                    <EmptyList>
                        The list of reviews is empty.
                    </EmptyList>
                ):(
                    <div>
                        List Revies
                    </div>
                )
                }
            </div>
        );
    }
}

export default Reviews;