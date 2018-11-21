import React, { Component } from 'react';
// import logo from './logo.svg';
import './Upload.css';

const Uppy = require('@uppy/core');
const Dashboard = require('@uppy/dashboard');
const GoogleDrive = require('@uppy/google-drive');
const Dropbox = require('@uppy/dropbox');
const Instagram = require('@uppy/instagram');
const Webcam = require('@uppy/webcam');
const AwsS3 = require('@uppy/aws-s3');
// const DragDrop = require('@uppy/drag-drop');
// const ProgressBar = require('@uppy/progress-bar');
// const Tus = require('@uppy/tus');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uppyPreviews: []
        };

        this.uppyOne = new Uppy({ debug: true, autoProceed: false});
        this.reader = new FileReader();

        // this.uploadFile = this.uploadFile.bind(this);
        // this.addFileToState = this.addFileToState.bind(this);
    }

    componentDidMount() {
        this.uppyOne
            .use(Dashboard, {
                trigger: '.UppyModalOpenerBtn',
                inline: false,
                target: '.DashboardContainer',
                replaceTargetContent: true,
                showProgressDetails: true,
                note: 'Images and video only, 2–3 files, up to 1 MB',
                height: 470,
                metaFields: [
                    { id: 'name', name: 'Name', placeholder: 'file name' },
                    { id: 'caption', name: 'Caption', placeholder: 'describe what the image is about' }
                ],
                browserBackButtonClose: true,
                onBeforeFileAdded: (currentFile, files) => {
                    console.log("i am going to add file to dashboard", currentFile);
                },
                onBeforeUpload: files => {
                    console.log("i am going to upload files", files);
                }
            })
            .use(GoogleDrive, { target: Dashboard, serverUrl: 'https://companion.uppy.io' })
            .use(Dropbox, { target: Dashboard, serverUrl: 'https://companion.uppy.io' })
            .use(Instagram, { target: Dashboard, serverUrl: 'https://companion.uppy.io' })
            .use(Webcam, { target: Dashboard })
            .use(AwsS3, {
                limit: 0,
                timeout: 30000,
                serverUrl: 'https://simplenotes.netlify.com'
            })
            
            .on('file-added', (file) => {
                console.log('Added file', file)
              })
            .on("file-removed", file => {
                console.log("removing", file);
            })
            .on("upload", data => {
                console.log("uploading", data);
            })
            .on("upload-success", (file, resp, uploadURL) => {
                console.log("upload successful" + file.name + uploadURL);
            })
            .on("complete", result => {
                console.log("failed ", result.failed);
                console.log("successful ", result.successful);
            })
            


        this.uppyOne.on('complete', (result) => {
            console.log(result);
        });

        // this.uppyOne.on('file-added', (file) => {
        //     console.log('Added file', file);

        //     this.reader.onload = (readerEvt) =>
        //         this.addFileToState({ file, base64: readerEvt.target.result });
        //     // Define this onload every time to get file and base64 every time
        //     this.reader.readAsDataURL(file.data);
        // });
        // couldn't figure a better solution on the spot
    }


    render() {
        return (
            <div className="Upload">
                <button className="UppyModalOpenerBtn">Add File</button>
                <div className="DashboardContainer">
                    {/* <div className="UppyDragDrop" />
                    <div className="UppyDragDrop-Progress" /> */}
                    {/* <button onClick={this.uploadFile}>Log previews to console / Submit</button> */}
                </div>
            </div>
        );
    }
}

export default App;

// type uppy_file_t = {
//   data: { /* File */
//     lastModified: float,
//     lastModifiedDate: Js.Date.t,
//     name: string,
//     size: float,
//     type: string,
//     webkitRelativePath: string,
//   },
//   extension: string,
//   id: string,
//   isRemote: bool,
//   meta: {
//     name: string,
//     type: string,
//   },
//   name: string,
//   preview: undefined,
//   progress: {
//     bytesTotal: float,
//     bytesUploaded: float,
//     percentage: int,
//     uploadComplete: bool,
//     uploadStarted: bool,
//   },
//   remote: string,
//   size: float,
//   source: string,
//   type: string,
// };

// type uppy_preview_t = {
//   file: uppy_file_t,
//   base64: string,
// };