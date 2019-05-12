import React  from 'react';
import styled from 'styled-components'
import Review from "./Review";

const EmptyList = styled.div`
    display: flex;
    justify-content: center;
    padding: 40px;
`;

const Reviews = ({reviews}) =>{
    return(
        <div>
            { reviews.length === 0 ? (
                <EmptyList>
                    The list of reviews is empty
                </EmptyList>
            ):(
                reviews.map(r => <Review review={r}/>)
            )
            }
        </div>
    )
};

export default Reviews;