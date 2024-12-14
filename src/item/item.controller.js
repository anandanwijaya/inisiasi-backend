const express = require('express')
const {createItem, getAllItems, getItemById, editItemById, deleteItemById} = require('./item.services');
const authorizeJwt = require('../middleware/authorizeJWT')
const adminAuthorization = require('../middleware/adminAuthorization')

const router = express.Router()

router.post('/', adminAuthorization, async(req, res) => {

    try {
        const newItemData = req.body
        const newItem = await createItem(newItemData)
        res.status(201).json(newItem)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/', authorizeJwt, async(req, res) => {
    
    try {
        const items = await getAllItems()
        res.status(200).send(items)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/:id', authorizeJwt, async(req, res) => {
    try {
        const itemId = parseInt(req.params.id)
        const item = await getItemById(itemId)
        res.status(200).send(item)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.put('/:id', adminAuthorization, async(req, res) => {
    try {
        const itemId = req.params.id
        const itemData = req.body
        const updatedItem = await editItemById(itemId, itemData)
        res.send(updatedItem)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.delete('/:id', adminAuthorization, async(req, res) => {
    try {
        const itemId = req.params.id
        await deleteItemById(itemId) 
        res.status(204).json({ message: 'item deleted' })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router