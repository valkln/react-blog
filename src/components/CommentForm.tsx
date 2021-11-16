import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from 'yup'
import { createComment, createPost } from "../redux/posts-reducer";
import { PostWCommentsType } from "../types/types";
type Tprops = {
	setCommentForm: (data: boolean) => void,
	post: PostWCommentsType
}
const CommentForm: React.FC<Tprops> = ({ setCommentForm, post }) => {
	const dispatch = useDispatch()
	const formik = useFormik({
		initialValues: {
			body: '',
		},
		validationSchema: Yup.object({
			body: Yup.string().required(),
		}),
		onSubmit: values => {
			dispatch(createComment(post.id, values.body))
			formik.resetForm()
			setCommentForm(false)
		},
	});
	return <Box
		sx={{ textAlign: 'left' }}
		component='form'
		onSubmit={formik.handleSubmit}>
		<TextField
			error={Boolean(formik.touched.body && formik.errors.body)}
			sx={{ margin: '10px auto' }}
			onChange={formik.handleChange}
			onBlur={formik.handleBlur}
			value={formik.values.body}
			multiline
			rows={3}
			id="outlined-basic"
			name='body'
			label="Your comment"
			variant="outlined" />
		<Box>
			<Button variant='contained' type="submit"  >Submit</Button>
		</Box>

	</Box>
}
export default CommentForm