import clientPromise from '$lib/mongodb-client'
import { ObjectId } from 'mongodb'

export async function get (request) {

    // console.log(request.params)

    const matchObjectId = request.params.id.match(/^[a-f\d]{24}$/i)
    // console.log(matchObjectId)

    const dbConnection = await clientPromise
    const db = dbConnection.db("BlottBase")
    const imagescoll = db.collection('images')
    let query = {}
    

    if (matchObjectId) {

    }
    else {
        query = {
            name: request.params.id
        }
    }

    const image = await imagescoll.findOne(query)
    // console.log(image)

    return {
        body: image
    }
}

export async function post (request) {

    console.log(request.body)
    console.log(request.params)
    
    // const base64 = btoa(request.body)

    const dbConnection = await clientPromise
    const db = dbConnection.db("BlottBase")

    const imagesdb = db.collection('images')

    const insertimg = await imagesdb.insertOne({
        name: request.params.id,
        base64: request.body
        // bin: request.body
    })

    console.log(insertimg)

    return {
        // status: 200,
        body: {response: 'ok'}
    }

}