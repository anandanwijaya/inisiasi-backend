let { insertItem, findItems, findItemById, editItem, deleteItem } = require('./item.repository')

async function createItem(newItemData) {
    
    let newItem = await insertItem(newItemData)
    return newItem
}

async function getAllItems() {

    let items = await findItems()
    return items
}

async function getItemById(id) {

    let item = await findItemById(id)
    if (!item) {
        throw Error('Item not found')
    }
    return item
}

async function editItemById(id, itemData) {

    await getItemById(id)
    let updatedItem = await editItem(id, itemData)
    return updatedItem
}

async function deleteItemById(id) {
    await getItemById(id)
    await deleteItem(id)
}

module.exports = {createItem, getAllItems, getItemById, editItemById, deleteItemById}