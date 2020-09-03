import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useFetching = (action, ...args) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(action(...args));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action, dispatch]);
};

export default useFetching;
