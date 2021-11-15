import { AppStateType } from './store';


export const setList = (state: AppStateType) => {
	return state.posts.list
}