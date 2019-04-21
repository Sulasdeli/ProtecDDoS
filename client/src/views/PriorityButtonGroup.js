import React from 'react'
import {ButtonGroup, ButtonToolbar, Button, ControlLabel, Header} from 'rsuite'

const CustomButtonGroup = ({ appearance }) => (
    <ButtonToolbar>
        <Header>Priority</Header>
        <ButtonGroup>
            <Button appearance={appearance} style={{color: 'green'}}>Low</Button>
            <Button appearance={appearance} style={{color: 'orange'}}>Medium</Button>
            <Button appearance={appearance} style={{color: 'red'}}>High</Button>
        </ButtonGroup>
    </ButtonToolbar>
);

export default CustomButtonGroup