import axios from "axios";
import { postValuesType } from "../types/types";

const instance = axios.create({
	baseURL: 'https://bloggy-api.herokuapp.com/',
	headers: { 'Content-Type': 'application/json' }
})
export const postAPI = {
	getList: async () => {
		const res = await instance.get('posts');
		return res.data;
	},
	getPost: (id: number) => {
		return instance.get(`posts/${id}?_embed=comments`)
			.then(res => res.data)
	},
	createPost: (title: string, body: string) => {
		return instance.post('posts', { title, body })
			.then(res => res.data)
	},
	updatePost: (id: number, title: string, body: string) => {
		return instance.put(`posts/${id}`, { title, body })
			.then(res => res.data)
	},
	deletePost: (id: number) => {
		return instance.delete(`posts/${id}`)
			.then(res => res.data)
	}
}
export const commentAPI = {
	createComment: (postId: number, body: string) => {
		return instance.post('comments', { postId, body })
			.then(res => res.data)
	}
}