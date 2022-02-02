import clientPromise from '$lib/mongodb-client'
import { ObjectId } from 'mongodb'

export async function get (request) {

    const dbConnection = await clientPromise
    const db = dbConnection.db("BlottBase")
    const collection = db.collection('plays')

    console.log('!!')
    
    const result = await collection.findOne({_id: ObjectId(request.params.id)})

    console.log(result)

    return {
        status: 200,
        body: result
    }

}