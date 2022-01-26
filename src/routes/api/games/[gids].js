import clientPromise from '$lib/mongodb-client'

export async function get (request) {

    const dbConnection = await clientPromise
    const db = dbConnection.db("BlottBase")
    const collection = db.collection('games')

    // console.log('request.params', request.params)
    
    const result = await collection.find({_id: parseInt(request.params.gids)}).toArray()

    return {
        // status: 200,
        body: result
    }

}