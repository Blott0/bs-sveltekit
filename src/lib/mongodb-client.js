import { MongoClient } from 'mongodb';
import db from './_db.js';

const uri = db.host;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}


let client = new MongoClient(uri, options)
let clientPromise = await client.connect()

// Export a module-scoped MongoClient promise. 
// By doing this in a separate module, 
// the client can be shared across functions.
export default clientPromise