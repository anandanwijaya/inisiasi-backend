let express = require('express')
let {createItem, getAllItems, getItemById, editItemById, deleteItemById} = require('./item.services');

let router = express.Router()

router.post('/', async(req, res) => {

    try {
        let newItemData = req.body
        let newItem = await createItem(newItemData)
        res.status(201).json(newItem)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/', async(req, res) => {
    
    try {
        let items = await getAllItems()
        res.status(200).send(items)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/:id', async(req, res) => {
    try {
        let itemId = parseInt(req.params.id)
        let item = await getItemById(itemId)
        res.status(200).send(item)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.put('/:id', async(req, res) => {
    try {
        let itemId = req.params.id
        let itemData = req.body
        let updatedItem = await editItemById(itemId, itemData)
        res.send(updatedItem)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.delete('/:id', async(req, res) => {
    try {
        let itemId = req.params.id
        await deleteItemById(itemId) 
        res.status(204).json({ message: 'item deleted' })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router