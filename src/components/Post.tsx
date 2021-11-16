import { Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { setPost } from "../redux/posts-selectors";
import { getPost, deletePost } from "../redux/posts-reducer";
import { Box } from "@mui/system";
import UpdateModal from "./UpdateModal";
import CommentForm from "./CommentForm";
const Post = () => {
	const params = useParams()
	let id = Number(Object.values(params)[0])
	useEffect(() => {
		dispatch(getPost(id))
	}, [])
	const dispatch = useDispatch()
	const navigate = useNavigate()
	let post = useSelector(setPost)

	const deleteClick = async () => {
		if (post) {
			await dispatch(deletePost(post.id))
			navigate('/')
		} else alert('something went wrong')
	}

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	let [commentForm, setCommentForm] = useState(false)
	if (post) return <Card>
		<CardContent>
			<Box>
				<Typography variant='h4' >{post.title}</Typography>
				<Typography sx={{ m: 2 }} >{post.body}</Typography>
				<Button onClick={handleOpen} size="small" >Update Post</Button>
				<Button onClick={() => deleteClick()} size="small">Delete Post</Button>
				<UpdateModal post={post} open={open} handleClose={handleClose} />
			</Box>
			<Divider />
			<Box sx={{ textAlign: 'left' }}>
				<Typography variant='h6' >Comments:</Typography>
				{post.comments.length > 0 ?
					post.comments.map(c => <Typography component='div' sx={{ m: 1 }}  >{c.body}</Typography>)
					:
					<Typography>No comments yet</Typography>}
			</Box>
		</CardContent>
		<CardActions>
			<Button size="small" onClick={() => setCommentForm(true)}>Leave comment</Button>
		</CardActions>
		{commentForm ?
			<CardContent>
				<CommentForm post={post} setCommentForm={setCommentForm} />
			</CardContent>
			:
			null
		}

	</Card>
	else return null
}
export default Post