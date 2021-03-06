import clientPromise from '$lib/mongodb-client'
import { ObjectId } from 'mongodb'

export async function get (request) {

    const dbConnection = await clientPromise
    const db = dbConnection.db("BlottBase")
    const collection = db.collection('users')
    
    const result = await collection.findOne({_id: ObjectId(request.params.id)})
    delete result.password
    return {
        // status: 200,
        body: result
    }

}