const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')
const companion = require('@uppy/companion')
const app = require('express')()

const DATA_DIR = path.join(__dirname, 'tmp')

app.use(require('cors')({
  origin: true,
  credentials: true
}))
app.use(require('cookie-parser')())
app.use(require('body-parser').json())
app.use(require('express-session')({
  secret: 'hello planet'
}))

const options = {
  providerOptions: {
    google: {
      key: process.env.COMPANION_GOOGLE_KEY || process.env.UPPYSERVER_GOOGLE_KEY,
      secret: process.env.COMPANION_GOOGLE_SECRET || process.env.UPPYSERVER_GOOGLE_SECRET
    },
    s3: {
      getKey: (req, filename) => `private/${filename}`,
      key: "AKIAJF7PP5XEV66HLVZQ",
      secret: "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",
      bucket: "notes-app-uploads1111",
      region: "us-east-2"
    }
  },
  server: { 
    host: 'simplenotes.netlify.com',
    protocal: "https"
 },
  filePath: DATA_DIR,
  secret: 'blah blah',
  debug: true
}

// Create the data directory here for the sake of the example.
try {
  fs.accessSync(DATA_DIR)
} catch (err) {
  fs.mkdirSync(DATA_DIR)
}
process.on('exit', function () {
  rimraf.sync(DATA_DIR)
})

app.use(companion.app(options))

const server = app.listen(8080, () => {
  console.log('listening on port 8080')
})

companion.socket(server, options)