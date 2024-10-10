let prisma = require('../db')

async function insertItem(itemData) {

    let newItem = await prisma.item.create({
        data: {
            name: itemData.name,
            description: itemData.description,
            quantity: itemData.quantity
        }
    })
    return newItem
}

async function findItems() {

    let items = await prisma.item.findMany()
    return items
}

async function findItemById(id) {
    
    let item = await prisma.item.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    return item
}

async function editItem(id, itemData) {
    
    let updatedItem = await prisma.item.update({
        where: {
            id: parseInt(id)
        }, 
        data: {
            name: itemData.name, 
            description: itemData.description, 
            quantity: itemData.quantity
        }
    })
    return updatedItem
}

async function deleteItem(id) {
    await prisma.item.delete({
        where: {
            id: parseInt(id)
        }
    })
}

async function updateItemQuantity(itemId, newQuantity) {
    await prisma.item.update({
        where: {
            id: itemId
        },
        data: {
            quantity: newQuantity
        }
    })
}

module.exports = {insertItem, findItems, findItemById, editItem, deleteItem, updateItemQuantity}