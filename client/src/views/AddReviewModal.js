import React, { Component } from 'react';
import {Typography} from "@material-ui/core";
import {Divider, Modal, Button, Input, Icon, Radio, RadioGroup, Alert} from "rsuite";
import FileUploader from "./FileUploader";
import ReactJson from "react-json-view";
import {getDomain} from "../helpers/getDomain";

class AddReviewModal extends Component {

    constructor() {
        super();
        this.state = {
            uploadedFile: null,
            fileContent: null,
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

        let data = new FormData();
        data.append('serviceId', this.props.serviceId);
        data.append('file', this.state.uploadedFile);
        data.append('rating', this.state.rating);
        data.append('comment', this.state.comment);
        this.setState({
            ...this.state,
            isLoading: true
        });

        fetch(`${getDomain()}/v1/upload`, {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
            body: data
        })
            .then(res => res.json())
            .then(jsonResponse => {

                this.props.onNewReview(jsonResponse);
                this.props.close();

                setTimeout(() => {
                    this.setState(
                        {
                            ...this.state,
                            isLoading: false
                        }
                    );
                }, 1000)
            })
            .catch(err => {
                if (err.message.match(/Failed to fetch/)) {
                    Alert.error('The server cannot be reached');
                } else {
                    Alert.error(err.message);
                }
            });
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
                        <FileUploader handleFile={this.handleChange('uploadedFile')} handleFileContent={this.handleChange('fileContent')} acceptedFiles={['application/json']} label={'Drag & Drop a JSON file or <span class="filepond--label-action">Browse</span>'}/>
                        {this.state.fileContent !== null ? (
                                <div style={{overflow: 'scroll', maxHeight: 350, marginBottom: 30}}>
                                    <ReactJson displayDataTypes={false} name={'LogFile'} enableClipboard={false} src={this.state.fileContent}/>
                                </div>
                            ):this.state.fileContent}
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
                    <Button onClick={this.submit} disabled={ this.state.comment === ''} appearance="primary">
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default AddReviewModal;
