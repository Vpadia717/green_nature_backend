const {cert, initializeApp} = require('firebase-admin/app')
const{getFirestore} =require('firebase-admin/firestore')
const serviceAccount = require('./privatekey.json')

console
initializeApp({
    credential:cert(serviceAccount)
})
const db =getFirestore()
module.exports ={db}