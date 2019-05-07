import React from 'react'
import {Typography} from "@material-ui/core";

const formatText = (text) => {
    if (text.constructor === Array){
        return text.join(', ')
    }
    return text
};

const ServiceTypography = ({ characteristic, text }) => (
    <div>
        <h6 style={{fontWeight: 'bold'}}>{characteristic}</h6>
        <Typography component="p" align="justify" color="textSecondary">
            {formatText(text)}
        </Typography>
    </div>
);

export default ServiceTypography