import React, { Component } from 'react';
import './Upload.css';

const Uppy = require('@uppy/core');
const Dashboard = require('@uppy/dashboard');
const GoogleDrive = require('@uppy/google-drive');
const Dropbox = require('@uppy/dropbox');
const Instagram = require('@uppy/instagram');
const Webcam = require('@uppy/webcam');
const AwsS3 = require('@uppy/aws-s3');


class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uppyPreviews: []
        };

        this.uppy = new Uppy({ debug: true, autoProceed: false });
    }

    componentDidMount() {
        this.uppy
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
            .use(GoogleDrive, { target: Dashboard, serverUrl: 'http://localhost:3010' })
            .use(Dropbox, { target: Dashboard, serverUrl: 'http://localhost:3010' })
            .use(Instagram, { target: Dashboard, serverUrl: 'http://localhost:3010' })
            .use(Webcam, { target: Dashboard })
            .use(AwsS3, {
                limit: 0,
                timeout: 30000,
                serverUrl: 'https://simplenotes.netlify.com:8080'
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



        this.uppy.on('complete', (result) => {
            console.log(result);
        });

    }


    render() {
        return (
            <div className="Upload">
                <button className="UppyModalOpenerBtn">Add File</button>
                <div className="DashboardContainer">
                </div>
            </div>
        );
    }
}

export default Upload;
