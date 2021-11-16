import { AppBar, Button, Toolbar } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import CreateModal from "./CreateModal";

const Header = () => {
	const navigate = useNavigate();
	const goHome = () => {
		navigate('/')
	}
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	return <AppBar position="static">
		<Toolbar>
			<Button onClick={goHome} color="inherit">Home</Button>
			<Button onClick={handleOpen} color="inherit">Create a post</Button>
			<CreateModal open={open} handleClose={handleClose} />
		</Toolbar>
	</AppBar>
}
export default Header