import React from "react";
import { useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Container from "@material-ui/core/Container";

import useFetching from "utils/useFetching";
import { userProfileRequest } from "reducers/auth/actions";
import Spinner from "components/Spinner";
import TabPanel from "components/TabPanel";
import UserInfo from "./UserInfo";
import RecipesList from "./RecipesList";

const Profile = () => {
	const auth = useSelector(state => state.auth);
	const { user, loading } = auth;
	const [tabNr, setTabNr] = React.useState(0);
	useFetching(userProfileRequest);

	if (loading) return <Spinner />;

	const handleTabChange = (event, newValue) => {
		setTabNr(newValue);
	};

	return (
		<Container maxWidth="md">
			<Box mt={2}>
				<UserInfo user={user} />
				<Tabs
					value={tabNr}
					onChange={handleTabChange}
					aria-label="simple tabs example"
					indicatorColor="primary"
					textColor="primary"
					centered
				>
					<Tab label="My recipes" />
					<Tab label="Saved recipes" />
					<Tab label="Settings" />
				</Tabs>
				<TabPanel value={tabNr} index={0}>
					{user.recipes ? (
						<RecipesList
							recipes={user.recipes}
							showAddmore={true}
						/>
					) : (
						<Spinner />
					)}
				</TabPanel>
				<TabPanel value={tabNr} index={1}>
					{user.savedRecipes ? (
						<RecipesList recipes={user.savedRecipes} />
					) : (
						<Spinner />
					)}
				</TabPanel>
				<TabPanel value={tabNr} index={2}>
					Item Three
					<UserInfo user={user} />
				</TabPanel>
			</Box>
		</Container>
	);
};

export default Profile;
