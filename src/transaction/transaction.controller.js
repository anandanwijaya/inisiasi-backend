let express = require('express')
let router = express.Router()
let transactionServices = require('./transaction.services')

router.post('/borrow', async(req, res) => {

    try {
        let {userId, itemId, quantityBorrowed} = req.body
        let newTransaction = await transactionServices.borrowItem(userId, itemId, quantityBorrowed)
        res.status(201).json(newTransaction)
    } catch (error) {
        res.status(400).send(error.message)
    }
})


router.get('/', async(req, res) => {
    
    try {
        let transactions = await transactionServices.getAllTransactions()
        res.send(transactions)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


router.get('/user', async(req, res) => {

    let {userId} = req.body
    try {
        let transactions = await transactionServices.getTransactionsByUserId(userId)
        res.status(200).send(transactions)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.patch('/verify/:transactionId', async(req, res) => {

    try {
        let {transactionId} = req.params
        let {status} = req.body
        await transactionServices.verifyTransaction(transactionId, status)
        res.status(200).json({message: 'Transaction verified successfully'})
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/return/:transactionId', async(req, res) => {

    try {
        let {transactionId} = req.params
        let {userId} = req.body
 
        let transaction = await transactionServices.getTransactionsById(transactionId)
        if(transaction.userId !== userId){
            return res.status(403).json({message: 'Unauthorized'})
        }

        await transactionServices.returnItem(transactionId)
        res.status(200).json({message: 'Item returned'})
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router