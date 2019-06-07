import React  from 'react';
import {FilePond} from "react-filepond";
import {Alert} from "rsuite";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import {registerPlugin} from "filepond";
registerPlugin(FilePondPluginFileValidateType);
const FileUploader = ({handleFile, handleFileContent}) => {

    const handleFileRead = (e) => {
        const content = fileReader.result;
        if (content) {
            try {
                handleFileContent(JSON.parse(content));
            } catch (err) {
                Alert.error("Uploaded File is not a valid Log File");
            }
        }
    };

    let fileReader;
    const handleFileChosen = (file) => {
        if (file[0]) {
            fileReader = new FileReader();
            fileReader.onloadend = handleFileRead;
            fileReader.readAsText(file[0].file);
            handleFile(file[0].file)
        } else {
            handleFile(null);
            handleFileContent(null);
        }
    };

    return (
        <FilePond
            acceptedFileTypes = {['application/json']}
            allowMultiple={false}
            onupdatefiles={(files) => {
                handleFileChosen(files)
            }}
            labelIdle='Drag & Drop a JSON file or <span class="filepond--label-action">Browse</span>'
        />
    );
};

export default FileUploader;
