const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    console.log('filterBy', filterBy);
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('toys')
        var toys = await collection.find(criteria).toArray()
        _sort(toys, filterBy.sortBy)
        return toys
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toys')
        const toy = collection.findOne({ '_id': ObjectId(toyId) })
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toys')
        await collection.deleteOne({ '_id': ObjectId(toyId) })
        return toyId
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function add(toy) {
    try {
        const collection = await dbService.getCollection('toys')
        const addedtoy = await collection.insertOne(toy)
        return addedtoy
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}
async function update(toy) {
    try {
        var id = ObjectId(toy._id)
        delete toy._id
        const collection = await dbService.getCollection('toys')
        await collection.updateOne({ "_id": id }, { $set: { ...toy } })
         toy._id = id;
        return toy
    } catch (err) {
        logger.error(`cannot update toy ${toyId}`, err)
        throw err
    }
}

function _buildCriteria(filterBy){
    const criteria = {}

    if(filterBy.name){
        criteria.name = { $regex: filterBy.name, $options: 'i' }
    }
    if(filterBy.inStock){
        const inStock = filterBy.inStock === 'true' ? true : false
        criteria.inStock = { $eq: inStock }
    }
    if(filterBy.labels && filterBy.labels.length){
        criteria.labels = { $in: filterBy.labels }
        // criteria.labels = { $all: filterBy.labels }
    }
    return criteria
}
function _sort(toys, sortBy){
    if(!sortBy) return

    switch(sortBy){
        case 'time':
            toys.sort((t1, t2) => t1.createdAt - t2.createdAt)
            break
        case 'name':
            toys.sort((t1, t2) => t1.name.localeCompare(t2.name))
            break
        case 'price':
            toys.sort((t1, t2) => t1.price - t2.price)
            break
    }
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
}