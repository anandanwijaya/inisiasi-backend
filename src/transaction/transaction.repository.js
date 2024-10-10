let prisma = require('../db')

async function createTransaction(userId, itemId, quantityBorrowed) {

    try {
        let newTransaction = await prisma.transaction.create({
            data: {
                userId,
                itemId,
                quantityBorrowed,
                status: "PENDING"
            }
        })    
        return newTransaction
    } catch (error) {
        throw new Error('Failed to create transaction')
    }
}

async function findTransactions() {
    
    try {
        let transactions = await prisma.transaction.findMany({
            include: {
                item: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return transactions
    } catch (error) {
        throw new Error('Failed to fetch transaction')
    }
}


async function findTransactionsByUserId(userId) {
    
    try {
        let transactions = await prisma.transaction.findMany({
            where: {
                userId: parseInt(userId)
            },
            include: {
                item: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return transactions
    } catch (error) {
        throw new Error('Failed to fetch transaction by User Id')
    }
}

async function findTransactionById(id) {
  
    let transaction = await prisma.transaction.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    return transaction  
}

async function updateTransactionStatus(transactionId, status, timeStampField) {
    
    try {
        let updateData = {status}

        if(timeStampField){
            updateData[timeStampField] = new Date()
        }

        await prisma.transaction.update({
            where: {
                id: parseInt(transactionId)
            },
            data: updateData
        })
    } catch (error) {
        throw new Error('Failed to update transaction status')
    }
}

module.exports = {createTransaction, findTransactions, findTransactionsByUserId, findTransactionById, updateTransactionStatus}