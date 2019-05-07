import React from 'react'

const ServiceLogo = ({ imageUrl, width, marginRight, alignSelf }) => (
    <img src={imageUrl} style={{width: width, marginRight: marginRight, alignSelf: alignSelf}}/>
);

export default ServiceLogo