# Cooking Blog

Cooking blog is a full stack application where you can store your recipe.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

This project required you to install:

-   [Nodejs](https://nodejs.org/en/) (**version >= 14.7**)
-   [React Native](https://reactnative.dev/docs/environment-setup) enviroment setup (**Expo version >= 3.23**)

### Installing

Firstly, clone this repo to your local host:

```
git clone https://github.com/NguyenVuNhan/cooking-blog.git
cd cooking-blog
```

Next, install node dependencies:

```
npm install
cd client
npm install
cd ../client-native
npm install
cd ..
```

Next, you will need to create `key.dev.js` file in `config` folder to be able to run in development mode. This file will contain:

```
module.exports = {
	mongoUrl: { MONGO_URI },
	secretOrKey: { SECRET_OR_KEY },
	imgur: {
		clientID: { IMGUR_CLIENT_ID },
		clientSecret: { IMGUR_CLIENT_SECRET },
		album: {
			id: { IMGUR_ALBUM_ID },
			deletehash: { IMGUR_ALBUM_DELETE_HASH }
		}
	}
};
```

I used imgur as the online storage for image since it FREE and well documented

When everything is done, you should be able to run the following command:

```
npm run dev
```

This will run the server side and client side concurrently

## License

[MIT](https://choosealicense.com/licenses/mit/)
