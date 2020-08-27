module.exports = {
	mongoUrl: process.env.MONGO_URI,
	secretOrKey: process.env.SECRET_OR_KEY,
	imgur: {
		clientID: process.env.IMGUR_CLIENT_ID,
		clientSecret: process.env.IMGUR_CLIENT_SECRET,
		album: {
			id: process.env.IMGUR_ALBUM_ID,
			deletehash: process.env.IMGUR_ALBUM_DELETE_HASH
		}
	}
};
