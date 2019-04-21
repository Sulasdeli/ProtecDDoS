import React from 'react'
import {Form, FormGroup, ControlLabel, HelpBlock, ButtonToolbar, Button, InputPicker, TagPicker, InputGroup, Input} from 'rsuite'
import regions from '../const/regions'
import serviceTypes from '../const/serviceTypes'
import leasingPeriods from '../const/leasingPeriods'
import PriorityButton from './PriorityButtonGroup'

export default UserForm => (
    <Form layout="horizontal">
        <FormGroup>
            <ControlLabel>Coverage Region(s)</ControlLabel>
            <TagPicker data={regions} style={{ width: 300 }}  />
            <PriorityButton appearance="subtle"/>
        </FormGroup>
        <FormGroup>
            <ControlLabel>Service Type(s)</ControlLabel>
            <TagPicker data={serviceTypes} style={{ width: 300 }}  />
            <HelpBlock tooltip>Required</HelpBlock>
        </FormGroup>
        <FormGroup>
            <ControlLabel>Leasing Period</ControlLabel>
            <InputPicker data={leasingPeriods} style={{ width: 300 }}/>
        </FormGroup>
        <FormGroup>
            <ControlLabel>Budget</ControlLabel>
            <InputGroup style={{width: 300}}>
                <Input/>
                <InputGroup.Addon>.-</InputGroup.Addon>
            </InputGroup>
        </FormGroup>
        <FormGroup style={{float: 'right', marginBottom: '15px'}}>
            <ButtonToolbar>
                <Button appearance="primary">Save</Button>
                <Button appearance="default">Cancel</Button>
            </ButtonToolbar>
        </FormGroup>
    </Form>
)