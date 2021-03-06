import clientPromise from '$lib/mongodb-client'

export async function get (request) {

    const dbConnection = await clientPromise
    const db = dbConnection.db("BlottBase")
    const collection = db.collection('users')
    
    const result = await collection.find({}).project({password: 0}).toArray()

    return {
        // status: 200,
        body: result
    }

}