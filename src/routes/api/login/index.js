import clientPromise from '$lib/mongodb-client'

import qs from 'querystring';

import bcrypt from 'bcrypt'
import cookie from 'cookie';
import { v4 as uuid } from '@lukeed/uuid';

export async function post (request) {

    const dbConnection = await clientPromise
    const db = dbConnection.db("BlottBase")
    const collection = db.collection('users')
    // const saltRounds = 10
    
    const result = await collection.findOne({ email : JSON.parse(request.body).email })
    // const result = await collection.findOne({ email : JSON.stringify(request.body.email) })

    // bcrypt.hash(JSON.parse(request.body).password, saltRounds, function(err, hash) {
    //     // Store hash in your password DB.
    //     console.log(hash)
    // });

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