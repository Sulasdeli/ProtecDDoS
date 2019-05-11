import React  from 'react';
import styled from 'styled-components'

const EmptyList = styled.div`
    display: flex;
    justify-content: center;
    padding: 40px;
`;

const Reviews = ({reviews}) =>{

    return(
        <div>
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