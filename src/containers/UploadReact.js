import React, { Component } from 'react';
import { DashboardModal } from '@uppy/react';

const Uppy = require('@uppy/core');
const Transloadit = require('@uppy/transloadit')
const Webcam = require('@uppy/webcam');
const GoogleDrive = require('@uppy/google-drive');
const Dropbox = require('@uppy/dropbox');
const Instagram = require('@uppy/instagram');
// const Tus = require('@uppy/tus')


class UploadReact extends Component {
  constructor (props) {
    super(props)

    this.state = {
      modalOpen: false
    }

    this.handleDashboardOpen = this.handleDashboardOpen.bind(this)
    this.handleDashboardClose = this.handleDashboardClose.bind(this)
  }
  
  componentWillMount () {
    this.uppy = new Uppy({
      id: 'uppy',
      autoProceed: true,
      restrictions: {
        maxFileSize: 200*1024*1024,
        maxNumberOfFiles: 1,
        allowedFileTypes: ['video/*']
      }
    })
    this.uppy.use(Transloadit, {
      waitForEncoding: true,
      params: {
        auth: { key: '19414a50e7bb11e89965990107f14baa' },
        template_id: '83604360f6ce11e8a9eeff3ad7f36b98'
      }
    })
    this.uppy.use(Webcam);
    this.uppy.use(GoogleDrive, {serverUrl: null});
    this.uppy.use(Dropbox, {serverUrl: null});
    this.uppy.use(Instagram, {serverUrl: null});
    // this.uppy.use(Tus, { resume: false })
    this.uppy.run()
    // this.uppy.on('transloadit:result', (stepName, result) => { this.handleUploadAssembly(stepName, result) })
    this.uppy.on("upload-success", (file) => {
      this.props.handleFileChange(file.data);
    })
    this.uppy.on('complete', result => { this.handleUploadComplete(result) })
  }

  componentWillUnmount () {
    this.uppy.close()
  }


  // handleUploadAssembly = (stepName, result) => {
  //   console.log(stepName)
  //   if (stepName === ':original')
  //     this.handleUploadFile(result)
  //   else if (stepName === 'animated')
  //     this.handleUploadThumb(result)
  // }

  handleUploadComplete = (result) => {
    this.uppy.reset()
    this.setState({ modalOpen: false })
    if (result.successful.length > 0) {
      console.log('upload successful')
      console.log(result)
    }
    else
      console.log('upload failed:', result.failed)
  }
  
  // handleUploadFile = (result) => {
  //   if (result && (result.type === 'video')) {
  //     console.log('upload file:', result.ssl_url)
  //     console.log(result)
  //   }
  // }

  // handleUploadThumb = (result) => {
  //   if (result && (result.ext === 'gif')) {
  //     console.log('upload thumb:', result.ssl_url)
  //     console.log(result)
  //   }
  // }

  handleDashboardClose = () => {
    this.setState({ modalOpen: false })
  }

  handleDashboardOpen = () => {
    this.setState({ modalOpen: true })
  }
  
  render () {
    return (
      <div>
        <h1>Uploader</h1>
        <button onClick={this.handleDashboardOpen}>Upload</button>
        <DashboardModal
          uppy={this.uppy}
          closeModalOnClickOutside
          open={this.state.modalOpen}
          onRequestClose={this.handleDashboardClose}
          plugins={['Webcam', 'GoogleDrive', 'Dropbox', 'Instagram']}
          note='Video files only, size 200MB or less'
        />
      </div>
    )
  }
}

export default UploadReact
