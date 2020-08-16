import React from "react";
import { useSelector } from "react-redux";
import UserInfo from "./UserInfo";

const Profile = () => {
	const user = useSelector(state => state.auth.user);

	return (
		<div style={{ marginTop: 20 }}>
			<UserInfo user={user} />
		</div>
	);
};

export default Profile;
