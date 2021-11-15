import { postAPI } from '../api/api';
import { PostType } from './../types/types';
import { BaseThunkType, InferActionTypes } from './store';
const initialState = {
	list: [] as Array<PostType>
}
type initialStateType = typeof initialState
const postsReducer = (state = initialState, action: ActionTypes): initialStateType => {
	switch (action.type) {
		case 'SET_LIST':
			debugger
			return {
				...state,
				list: action.payload
			}
		default: return state
	}
}
const actions = {
	setList: (posts: PostType[]) => ({ type: 'SET_LIST', payload: posts } as const)
}
type ActionTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionTypes>
export const getList = (): ThunkType => async (dispatch) => {
	const res = await postAPI.getList()
	dispatch(actions.setList(res))
}

export default postsReducer