import clientPromise from '$lib/mongodb-client'

export async function post (request) {

    const dbConnection = await clientPromise
    const db = dbConnection.db("BlottBase")
    
    const collection = db.collection('images')
    
    // const result = await collection.find({}).toArray()

    return {
        // status: 200,
        body: result
    }

}