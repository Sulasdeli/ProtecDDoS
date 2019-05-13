import React  from 'react';
import {FilePond} from "react-filepond";
import {Alert} from "rsuite";

const FileUploader = ({handleFile, handleFileContent}) => {

    const handleFileRead = (e) => {
        const content = fileReader.result;
        try {
            handleFileContent(JSON.parse(content));
        } catch (err) {
           console.log(err)
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
        <div>
            <FilePond
                allowMultiple={false}
                onremovefile={() => {

                }}
                onupdatefiles={(files) => {
                    handleFileChosen(files)
                }}
                labelIdle='Drag & Drop a JSON file or <span class="filepond--label-action">Browse</span>'
            />
        </div>
    );
};

export default FileUploader;
