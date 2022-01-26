import clientPromise from '$lib/mongodb-client'
import { ObjectId } from 'mongodb'
import { parseString } from 'xml2js'

export async function get (request) {

    const dbConnection = await clientPromise
    const db = dbConnection.db("BlottBase")

    const collection = db.collection('users')
    const gamesids = await collection.findOne({_id: ObjectId(request.params.id)}, { projection: { owns: 1, _id: 0 }})
    
    const collection2 = db.collection('games')

    const query = { _id: { $in: [] } }
    
    if (gamesids.owns) {
        gamesids.owns.forEach(gameid => {
            query._id.$in.push(parseInt(gameid))
        });
    }
    
    const result = await collection2.find(query).toArray()

    return {
        status: 200,
        body: result
    }

}

export async function put (request) {

    const dbConnection = await clientPromise
    const db = dbConnection.db("BlottBase")

    const collection = db.collection('users')

    if (!request.locals.authenticated) {

        return {
            status: 403,
            body: { result: 'fail' }
        }

    }
    else {
        const gamescollection = db.collection('games')
        const games = await gamescollection.find({}).project({ _id: 1, yearpublished: 0, minplayers: 0, maxplayers: 0, playingtime: 0, name: 0, description: 0, image: 0, boardgamepublisher: 0, yearpublished: 0, yearpublished: 0, boardgamedesigner: 0, boardgamecategory: 0, boardgamemechanic: 0, averageweight: 0, teams: 0, created: 0}).toArray()

        let gamesids = []
        games.forEach(game => {
            gamesids.push(game._id)
        });
        
        if (gamesids.includes(parseInt?.(request.body))) {
            const collectionids = await collection.findOne({_id: ObjectId(request.params.id)}, { projection: { owns: 1, _id: 0 }})
            if(collectionids.owns.includes(parseInt(request.body))) {
                return {
                    status: 218,
                    body: { result: 'alreay in collection' }
                }
            }
            // gameid already in db.. just add to collection
            const result = await collection.updateOne({_id: ObjectId(request.params.id)}, { $push: { owns: parseInt(request.body) } } )
            return {
                status: 200,
                body: result
            }
        }
        else if(parseInt?.(request.body)) {
            // gameid not in db.. add to db, then add to collection
            // get game info from bgg
            const gameXML = await (await fetch("https://boardgamegeek.com/xmlapi/boardgame/" + parseInt(request.body) + "?stats=1")).text()
            let result
            parseString(gameXML, async function(error, res) {
                

                if (res.boardgames.boardgame[0].error) {
                    // game not found
                    result = 'no game found'
                }
                else {
                    
                    const gameParsed = res.boardgames.boardgame[0]

                    function makeArray(array) {
                        let newArray = []
                        array.forEach(element => {
                            newArray.push(element._)
                        });
                        return newArray
                    }

                    const game = {
                        _id: parseInt(gameParsed.$.objectid),
                        yearpublished: parseInt(gameParsed.yearpublished[0]),
                        minplayers: parseInt(gameParsed.minplayers[0]),
                        maxplayers: parseInt(gameParsed.maxplayers[0]),
                        playingtime: parseInt(gameParsed.playingtime[0]),
                        name: gameParsed.name[0]._,
                        description: gameParsed.description[0],
                        image: gameParsed.image[0],
                        boardgamepublisher: gameParsed.boardgamepublisher[0]._,
                        boardgamedesigner: makeArray(gameParsed.boardgamedesigner),
                        boardgamecategory: makeArray(gameParsed.boardgamecategory),
                        boardgamemechanic: makeArray(gameParsed.boardgamemechanic),
                        averageweight: parseFloat(gameParsed.statistics[0].ratings[0].averageweight[0])
                    }

                    const gameAdded = await gamescollection.insert(game)
                    result = await collection.updateOne({_id: ObjectId(request.params.id)}, { $push: { owns: parseInt(request.body) } } )
                    
                }

            })

            if (result === 'no game found') {
                return {
                    status: 406,
                    body: result
                }
            }
            else {
                return {
                    status: 201,
                    body: result
                }
            }
            

        }
        else {
            const searchresult = await (await fetch("https://boardgamegeek.com/xmlapi/search?search=" + request.body)).text()
            let result
            parseString(searchresult, async function(error, res) {
                result = res
            })
            if (result.boardgames.boardgame) {
                return {
                    status: 219,
                    body: result
                }
            }
            else {
                return {
                    status: 406,
                    body: result
                }
            }
            
        }
        
    }

}