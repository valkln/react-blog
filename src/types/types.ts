export type PostType = {
	title: string,
	body: string,
	id: number
}
export type PostWCommentsType = {
	title: string,
	body: string,
	id: number,
	comments: commentType[]
}
export type commentType = {
	postId: number,
	body: string
}
export type postValuesType = {
	title: string,
	body: string
}