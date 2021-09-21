const { createService } = require('./create-service-controller')
const { getAllServices } = require('./get-all-services-controller')
const { getSingleService } = require('./get-single-service-controller')
const { editService } = require('./edit-service-controller')
const { deleteService } = require('./delete-service-controller')

module.exports = {
    createService,
    getAllServices,
    getSingleService,
    editService,
    deleteService
}