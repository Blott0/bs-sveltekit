import clientPromise from '$lib/mongodb-client'
import { ObjectId } from 'mongodb'

export async function get (request) {

    const dbConnection = await clientPromise
    const db = dbConnection.db("BlottBase")

    const collection = db.collection('users')
    const friendids = await collection.findOne({_id: ObjectId(request.params.id)}, { projection: { friends: 1, _id: 0 }})
    
    const query = { _id: { $in: [] } }
    
    if (friendids.friends) {
        
        friendids.friends.forEach(friend => {
            query._id.$in.push(ObjectId(friend))
        })
    }
    
    const result = await collection.find(query).project({ password: 0 }).toArray()

    return {
        status: 200,
        body: result
    }

}

export async function put (request) {

    if (!request.locals.authenticated) {
        return {
            status: 403,
            body: { result: 'fail' }
        }
    }
    
    const dbConnection = await clientPromise
    const db = dbConnection.db("BlottBase")

    const collection = db.collection('users')

    const friendids = await collection.findOne({_id: ObjectId(request.params.id)}, { projection: { friends: 1, _id: 0 }})
    const idlist = friendids.friends.map( id => id.toString() )

    let newfriend

    if (request.body.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        newfriend = await collection.findOne({ email : request.body }, { projection: {password: 0} })
    }
    else {
        newfriend = await collection.findOne({ _id : ObjectId(request.body) }, { projection: {password: 0} })
    }

    if (!newfriend) {
        return {
            status: 406,
            body: { result: 'fail' }
        }
    }
    else if (idlist.includes(ObjectId(newfriend._id).toString())) {
        return {
            status: 218,
            body: { result: 'fail' }
        }
    }
    const result = await collection.updateOne({_id: ObjectId(request.params.id)}, { $push: { friends: ObjectId(newfriend._id) } } )
    if (result) {
        return {
            status: 201,
            body: newfriend
        }
    }
}