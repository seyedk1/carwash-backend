const path = require('path')

const express = require('express')
const fileUpload = require("express-fileupload");
const dotEnv = require('dotenv')
const morgan = require('morgan')

const connectedDB = require('./config/database')
const { errorHandler } = require("./core/middleware/errors");
const { setHeaders } = require("./core/middleware/headers");

// Load Config
dotEnv.config({ path: './config/config.env' })

// Database Connection
connectedDB()

const app = express()

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Body Parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(setHeaders)

//* File Upload Middleware
app.use(fileUpload());

// Static Folders
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use("/api/users", require('./app/users/router'))
app.use("/api/lookup", require('./app/lookup/router'))
app.use("/api/services", require('./app/services/router'))
app.use("/api/orders", require('./app/orders/router'))

//* Error Controller
app.use(errorHandler);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))