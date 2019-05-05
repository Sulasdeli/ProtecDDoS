import React from 'react'
import ReactJson from 'react-json-view'

const JSONViewer = ({json}) => (
    <ReactJson src={json} theme="monokai" />
);

export default JSONViewer