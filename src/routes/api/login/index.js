import clientPromise from '$lib/mongodb-client'

import qs from 'querystring';

import bcrypt from 'bcrypt'
import cookie from 'cookie';
import { v4 as uuid } from '@lukeed/uuid';
import { ObjectId } from 'mongodb'

export async function post (request) {

    const dbConnection = await clientPromise
    const db = dbConnection.db("BlottBase")
    const collection = db.collection('users')
    
    const result = await collection.findOne({ email : JSON.parse(request.body).email })

    if ((result === null) || !JSON.parse(request.body).password) {
        return {
            status: 200,
            body: { result: 'fail' }
        }
    }

    if (result.password) {
        
        const match = await bcrypt.compare(JSON.parse(request.body).password, result.password);
        if (!match) {
            return {
                status: 200,
                body: { result: 'fail' }
            }
        }
        else {

            const cookieId = uuid()
            const collection = db.collection('sessions')

            const sessionLog = await collection.insertOne({ 
                _id: cookieId,
                _uid: result._id,
                username: result.username,
                email: result.email,
                avatar: result.avatar,
                expires: new Date()
            })
            const headers = {
                'Set-Cookie': cookie.serialize('session_id', cookieId, {
                    httpOnly: true,
                    maxAge: 60 * 30,
                    sameSite: 'strict',
                    path: '/'
                })
            }

            delete result.password
            return {
                status: 200,
                headers,
                body: result
            }
        }
    }
    else {
        return {
            status: 200,
            body: { result: 'fail' }
        }
    }
}

export async function put(request) {
    if (!request.locals.authenticated) {
        return {
            status: 200,
            body:  { result: 'not authenticated' }
        }
    }
    const match = request.body.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&-_])[A-Za-z\d@$!%*#?&-_]{8,}$/)
    if (!match) {
        return {
            status: 200,
            body:  { result: 'passwords not legal' }
        }
    }
    else {
        const dbConnection = await clientPromise
        const db = dbConnection.db("BlottBase")
        const collection = db.collection('users')

        const saltRounds = 10
        await bcrypt.hash(request.body, saltRounds).then(async function(hash) {
            let result = await collection.updateOne({_id: ObjectId(request.locals.uid)}, {$set: { password: hash }} )
            return result
        }).then( function(result) {
            console.log('returning:', result)
        } )
        // returns before actually doing anything (async problem)
        return {
            statuds: 200,
            body: {result: 'success'}
        }
    }
}