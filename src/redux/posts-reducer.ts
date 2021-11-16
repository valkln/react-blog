import { commentAPI } from '../api/api';
import { postAPI } from '../api/api';
import { PostType, postValuesType, PostWCommentsType } from '../types/types';
import { BaseThunkType, InferActionTypes } from './store';
const initialState = {
	list: [] as Array<PostType>,
	post: null as PostWCommentsType | null
}
type initialStateType = typeof initialState
const postsReducer = (state = initialState, action: ActionTypes): initialStateType => {
	switch (action.type) {
		case 'SET_LIST':
			return {
				...state,
				list: action.payload
			}
		case 'SET_POST':
			return {
				...state,
				post: action.payload
			}
		case 'ADD_POST':
			return {
				...state, list: [...state.list, { id: action.payload.id, body: action.payload.body, title: action.payload.title }]
			}
		default: return state
	}
}
const actions = {
	setList: (posts: PostType[]) => ({ type: 'SET_LIST', payload: posts } as const),
	setPost: (post: PostWCommentsType) => ({ type: 'SET_POST', payload: post } as const),
	addPost: (post: PostType) => ({ type: 'ADD_POST', payload: post } as const)
}
type ActionTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionTypes>
export const getList = (): ThunkType => async (dispatch) => {
	const res = await postAPI.getList()
	dispatch(actions.setList(res))
}
export const getPost = (id: number): ThunkType => async (dispatch) => {
	const res = await postAPI.getPost(id)
	dispatch(actions.setPost(res))
}
export const deletePost = (id: number): ThunkType => async (dispatch) => {
	await postAPI.deletePost(id)
	dispatch(getList)
}
export const createPost = (values: postValuesType): ThunkType => async (dispatch) => {
	const res: PostType = await postAPI.createPost(values.title, values.body)
	dispatch(actions.addPost(res))
}
export const updatePost = (id: number, values: postValuesType): ThunkType => async (dispatch) => {
	await postAPI.updatePost(id, values.title, values.body)
	dispatch(getPost(id))
}
export const createComment = (id: number, body: string): ThunkType => async (dispatch) => {
	await commentAPI.createComment(id, body)
	dispatch(getPost(id))
}

export default postsReducer