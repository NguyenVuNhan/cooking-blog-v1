import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useFetching = action => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(action());
	}, [action, dispatch]);
};

export default useFetching;
