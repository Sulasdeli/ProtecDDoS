import React, { Component } from 'react';
import {Card, CardContent} from "@material-ui/core";
import CardHeader from "../views/CardHeader";
import jsonFileLogo from "../assets/icons/json.png";
import {Uploader, Divider} from "rsuite";
import ReactJson from 'react-json-view'

class UploadPage extends Component {

    constructor() {
        super();
        this.state = {
            uploadedFile: null
        };
    }

    removeFile = () => {
        this.setState({
            ...this.state,
            uploadedFile: null
        });
    };



    render() {

        let fileReader;
        const handleFileRead = (e) => {
            const content = fileReader.result;
            this.setState({
                ...this.state,
                uploadedFile: JSON.parse(content)
            });
        };
        const handleFileChosen = (file) => {
            if (file[0]) {
                fileReader = new FileReader();
                fileReader.onloadend = handleFileRead;
                fileReader.readAsText(file[0].blobFile)
            }
        };

        return (
            <Card style={{width: 450, marginTop: 30, marginLeft: 30}}>
                <CardHeader title='Upload Attack Log File' iconName='file-upload' backgroundColor='#fb6340'/>
                <CardContent style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <Uploader autoUpload={false} onChange={handleFileChosen} onRemove={this.removeFile}>
                        <button style={{width: 400, height: 150}}>
                            <img src={jsonFileLogo} style={{width: 35}}/>
                        </button>
                    </Uploader>
                    <Divider>Log File</Divider>
                    {this.state.uploadedFile !== null ? (
                        <ReactJson displayDataTypes={false} src={this.state.uploadedFile} collapsed={true}/>
                        ):
                    <div>
                        No file uploaded
                    </div>}
                </CardContent>
            </Card>
        );
    }
}

export default UploadPage;
