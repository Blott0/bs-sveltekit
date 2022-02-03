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

    if (!request.locals.authenticated) {
        return {
            status: 403,
            body: { result: 'fail' }
        }
    }

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

    const result = await collection.insertOne(newplay)

    const logs = db.collection('logs')
    const log = {
        date: new Date(),
        user: {
            id: ObjectId(request.locals.uid),
            username: request.locals.username
        },
        event: {
            category: 'plays',
            target: result.insertedId
        }
    }
    const logging = await logs.insertOne(log)

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