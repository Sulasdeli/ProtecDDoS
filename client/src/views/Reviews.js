import React  from 'react';
import styled from 'styled-components'
import {Icon} from "rsuite";
import {Fab, Typography} from "@material-ui/core"

const Container = styled.span`
    justify-content: space-between;
    display: flex;
    align-items: center;
`;

const EmptyList = styled.div`
    display: flex;
    justify-content: center;
    padding: 40px;
`;

const Reviews = ({reviews}) =>{

    return(
        <div>
            <Container>
                <Typography variant="h4" style={{fontWeight: 'bold'}}>
                    Reviews
                </Typography>
                <Fab style={{background: '#41a5f5'}} size="medium" aria-label="Add">
                    <Icon icon="plus" style={{color: "white"}} size={"lg"}/>
                </Fab>
            </Container>
            <hr/>
            { reviews === null ? (
                <EmptyList>
                    The list of reviews is empty
                </EmptyList>
            ):(
                <div>
                    List Reviews
                </div>
            )
            }
        </div>
    )
};

export default Reviews;