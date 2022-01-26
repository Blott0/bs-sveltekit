import clientPromise from '$lib/mongodb-client'
import { ObjectId } from 'mongodb'

import cookie from 'cookie';

export async function get (request) {

    const dbConnection = await clientPromise
    const db = dbConnection.db("BlottBase")
    const collection = db.collection('plays')
    
    const result = await collection.find({}).toArray()

    return {
        // status: 200,
        body: result
    }

}

export async function post (request) {

    const dbConnection = await clientPromise
    const db = dbConnection.db("BlottBase")
    const collection = db.collection('plays')

    function objectidify(play) {
        play.result.forEach(res => {
            res.player._id = ObjectId(res.player._id)
        });
        return play
    }

    const newplay = objectidify(JSON.parse(request.body))

    console.log(newplay)

    const result = await collection.insertOne(newplay)

    if (result) {
        return {
            status: 201,
            body: {result: 'success'}
        }
    }
    else {
        return {
            status: 406,
            body: {result: 'fail'}
        }
    }

}