import cookie from 'cookie'
import clientPromise from '$lib/mongodb-client'
// import { v4 as uuid } from '@lukeed/uuid'

export const handle = async ({ request, resolve }) => {
	const cookies = cookie.parse(request.headers.cookie || '');
	// request.locals.userid = cookies.userid || uuid();

	if (!cookies.session_id) {
		request.locals.authenticated = false
	}
	else {

		const dbConnection = await clientPromise
		const db = dbConnection.db("BlottBase")
		const collection = db.collection('sessions')
		
		const result = await collection.findOne({ _id : cookies.session_id })
		if (result) {
			request.locals.authenticated = true
			request.locals.uid = result._uid.toString()
			request.locals.username = result.username
			request.locals.email = result.email
			request.locals.avatar = result.avatar?.toString() || undefined
		}
		else {
			request.locals.authenticated = false
		}
	}
	

	// TODO https://github.com/sveltejs/kit/issues/1046
	if (request.query.has('_method')) {
		request.method = request.query.get('_method').toUpperCase()
	}

	const response = await resolve(request)

	// if (!cookies.userid) {
	// 	// if this is the first time the user has visited this app,
	// 	// set a cookie so that we recognise them when they return
	// 	response.headers['set-cookie'] = cookie.serialize('userid', request.locals.userid, {
	// 		path: '/',
	// 		httpOnly: true
	// 	});
	// }

	return response
}

export function getSession(request) {
	if (request.locals && request.locals.authenticated && request.locals.uid) {
		return {
			authenticated: request.locals.authenticated,
			uid: request.locals.uid,
			username: request.locals.username,
			email: request.locals.email,
			avatar: request.locals.avatar
		}
		
	}
	else {
		return {
			authenticated: false
		}
	}
}  