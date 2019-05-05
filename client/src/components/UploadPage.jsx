import React, { Component } from 'react';
import {Card, CardContent} from "@material-ui/core";
import CardHeader from "../views/CardHeader";
import jsonFileLogo from "../assets/icons/json.png";
import {Uploader, Divider} from "rsuite";

class UploadPage extends Component {

    constructor() {
        super();
        this.state = {
            uploadedFile: null
        };
    }

    uploadFile = file => {
        console.log(file)

        this.setState({
            ...this.state,
            uploadedFile: file
        });

        console.log(this.state)
    };

    render() {
        return (
            <Card style={{width: 450, marginTop: 30, marginLeft: 30}}>
                <CardHeader title='Upload Attack Log File' iconName='file-upload' backgroundColor='#fb6340'/>
                <CardContent style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <Uploader autoUpload={false} onChange={this.uploadFile}>
                        <button style={{width: 400, height: 150}}>
                            <img src={jsonFileLogo} style={{width: 35}}/>
                        </button>
                    </Uploader>
                    <Divider>JSON Content</Divider>
                    <div>This is the content</div>
                </CardContent>
            </Card>
        );
    }
}

export default UploadPage;
