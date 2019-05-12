import React  from 'react';
import styled from 'styled-components'
import {Icon} from "rsuite";

const CommentContainer = styled.div`
    background-color: rgb(237, 244, 255);
    border-radius: 4px;
    padding: 12px;
    color: black
`;

const RatingContainer = styled.div`
    background-color: rgb(237, 244, 255);
    border-radius: 4px;
    padding: 12px;
    display: flex;
    justify-content: flex-end;
`;
const Review = ({review}) =>{
    return(
        <div>
            <RatingContainer>
                Rating:
                &nbsp;
                {review.rating === 1 ? (
                    <Icon icon="thumbs-o-up" size={"lg"}/>
                ):(
                    <Icon icon="thumbs-o-down" size={"lg"}/>
                )}
            </RatingContainer>
            <CommentContainer>
                {review.comment}
            </CommentContainer>
            <br/>
        </div>
    )
};

export default Review;