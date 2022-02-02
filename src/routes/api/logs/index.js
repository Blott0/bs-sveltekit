import clientPromise from '$lib/mongodb-client'

export async function get(request) {
    const dbConnection = await clientPromise
    const db = dbConnection.db("BlottBase")
    const logscollection = db.collection('logs')

    const log = await logscollection.find({}).sort({date: -1}).limit(3).toArray()
    console.log(log)
    return {
        status: 200,
        body: log
    }
}