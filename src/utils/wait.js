const wait = milliseconds => {
	return new Promise(resolve => setTimeout(resolve, milliseconds));
};
export default wait;
