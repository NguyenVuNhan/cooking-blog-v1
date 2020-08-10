const axios = require("axios");
const multer = require("multer");
const key = require("../config/keys");

// Multer config
const storage = multer.memoryStorage();
const upload = multer({
	storage
}).single("image");

// Axios instace config
const axios_imgur = axios.create({
	baseURL: "https://api.imgur.com",
	headers: {
		common: {
			"Content-Type": "multipart/form-data",
			Authorization: "Client-ID " + key.imgur.clientID
		}
	}
});

const uploadImage = file => {
	const imageBuffer = file.buffer.toString("base64");

	return axios_imgur.post("/3/image", {
		image: imageBuffer,
		album: key.imgur.album.deletehash
	});
};

const deleteImage = imageId => {
	return axios_imgur.delete(`/3/image/${imageId}`);
};

module.exports = { uploadImage, deleteImage, upload };
