import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getList } from "../redux/posts-reducer";
import { setList } from "../redux/posts-selectors";

const List = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getList())
	}, [])
	const navigate = useNavigate()
	const list = useSelector(setList)
	const openPost = (id: number) => {
		navigate(`/posts/${id}`)
	}
	if (list.length > 0) return <>
		{list.map(post =>
			<Card key={post.id} sx={{ minWidth: 275, p: 2, m: 2 }}>
				<CardContent>
					<Typography variant="h5" component="div">
						{post.title}
					</Typography>
					<Typography variant="body2">
						{post.body}
					</Typography>
				</CardContent>
				<CardActions>
					<Button onClick={() => openPost(post.id)} size="small">Open Post</Button>
				</CardActions>
			</Card>
		)}
	</>
	else return <div></div>
}
export default List