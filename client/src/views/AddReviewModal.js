import React, { Component } from 'react';
import {Typography} from "@material-ui/core";
import {Divider, Modal, Button, Input, Icon, Radio, RadioGroup} from "rsuite";
import FileUploader from "./FileUploader";
import ReactJson from "react-json-view";
import styled from "styled-components";

const Container = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
`;

class AddReviewModal extends Component {

    constructor() {
        super();
        this.state = {
            uploadedFile: null,
            comment: '',
            rating: 1
        };
    }

    handleChange = name => event => {
        this.setState({
            ...this.state,
            [name]: event
        });
    };

    submit = () => {
        // TODO Review Submission
        this.props.close()
    };

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.close}>
                <Modal.Header>
                    Write a Review
                </Modal.Header>
                <Modal.Body>
                    <Typography variant="h6" style={{fontWeight: 'bold'}}>
                        Attack Log File
                    </Typography>
                    <hr/>
                        <FileUploader handleFile={this.handleChange('uploadedFile')} fileContent={this.state.uploadedFile}/>
                        {this.state.uploadedFile !== null ? (
                                <div style={{overflow: 'scroll', maxHeight: 350, marginBottom: 30}}>
                                    <ReactJson displayDataTypes={false} enableClipboard={false} src={this.state.uploadedFile}/>
                                </div>
                            ):null}
                            <span/>
                    <Divider/>
                    <Typography variant="h6" style={{fontWeight: 'bold'}}>
                        Rating
                    </Typography>
                    <hr/>
                    <RadioGroup name="radioList" style={{marginBottom: 20, marginTop: 20}} inline appearance="picker" defaultValue={1}>
                        <Radio value={1} onChange={this.handleChange("rating")}><Icon icon="thumbs-o-up" size={"lg"}/></Radio>
                        <Radio value={2} onChange={this.handleChange("rating")}><Icon icon="thumbs-o-down" size={"lg"}/></Radio>
                    </RadioGroup>
                    <h6 style={{fontWeight: 'bold', fontSize: 16}}>Comment</h6>
                    <Input componentClass="textarea" onChange={this.handleChange("comment")} rows={4}/>
                </Modal.Body>
                <Divider/>
                <Modal.Footer>
                    <Button onClick={this.props.close} appearance="subtle">
                        Cancel
                    </Button>
                    <Button onClick={this.submit} disabled={this.state.uploadedFile === null || this.state.comment === ''} appearance="primary">
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default AddReviewModal;