const { createLookup } = require('./create-lookup-controller')
const { getAllLookups } = require('./get-all-lookup-controller')
const { getSingleLookup } = require('./get-single-lookup-controller')
const { editLookup } = require('./edit-lookup-controller')
const { deleteLookup } = require('./delete-lookup-controller')

module.exports = {
    createLookup,
    getAllLookups,
    getSingleLookup,
    editLookup,
    deleteLookup
}
