const imgurUrlModifier = (url, modifier) => {
	const dotIndex = url.lastIndexOf(".");
	return [url.slice(0, dotIndex), modifier, url.slice(dotIndex)].join("");
};

export default imgurUrlModifier;
