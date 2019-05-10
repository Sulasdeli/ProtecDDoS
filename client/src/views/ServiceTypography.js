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
        <h6 style={{fontWeight: 'bold', fontSize: 16}}>{characteristic}</h6>
        <Typography component="p" align="justify" color="textSecondary" style={{fontSize: 17}}>
            {formatText(text)}
        </Typography>
    </div>
);

export default ServiceTypography