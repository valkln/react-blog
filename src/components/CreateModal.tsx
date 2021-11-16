import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from 'yup'
import { createPost } from "../redux/posts-reducer";
type Tprops = {
	handleClose: () => void,
	open: boolean
}
const CreateModal: React.FC<Tprops> = ({ handleClose, open }) => {
	const dispatch = useDispatch()
	const formik = useFormik({
		initialValues: {
			title: '',
			body: '',
		},
		validationSchema: Yup.object({
			title: Yup.string().required(),
			body: Yup.string().required(),
		}),
		onSubmit: values => {
			dispatch(createPost(values))
			formik.resetForm()
			handleClose()
		},
	});
	return <>
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description">
			<Box sx={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				width: 400,
				bgcolor: 'white',
				border: '1px solid #000',
				borderRadius: 2,
				boxShadow: 24,
				p: 4
			}}>
				<Typography id="modal-modal-title" variant="h6" component="h2">
					Post creation
				</Typography>
				<Box
					component='form'
					onSubmit={formik.handleSubmit}>
					<TextField
						error={Boolean(formik.touched.title && formik.errors.title)}
						sx={{ margin: '5px auto' }}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.title}
						fullWidth
						id="outlined-basic"
						name='title'
						label="title"
						variant="outlined" />
					<TextField
						error={Boolean(formik.touched.body && formik.errors.body)}
						sx={{ margin: '10px auto' }}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.body}
						multiline
						fullWidth
						rows={5}
						id="outlined-basic"
						name='body'
						label="text"
						variant="outlined" />
					<Button variant='contained' type="submit"  >Submit</Button>
				</Box>
			</Box>
		</Modal>
	</>
}
export default CreateModal