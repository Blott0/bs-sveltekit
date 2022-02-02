import clientPromise from '$lib/mongodb-client'

export async function get (request) {

    const dbConnection = await clientPromise
    const db = dbConnection.db("BlottBase")
    const collection = db.collection('games')
    
    const result = await collection.findOne({_id: parseInt(request.params.id)})

    return {
        status: 200,
        body: result
    }

}