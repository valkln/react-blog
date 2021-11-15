import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { setList } from "../redux/posts-selectors";

const List = () => {
	const list = useSelector(setList)
	if (list.length > 0) return <Box>
		{list.map(post => <div>{post.title}</div>)}
	</Box>
	else return <div></div>
}
export default List