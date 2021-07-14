export interface ITodo {
	text: string;
	isComplete: boolean;
	id: string;
}

export default class Todo implements ITodo {
	public text: string;
	public isComplete: boolean;
	public id: string;

	constructor({ text, isComplete, id }: ITodo) {
		this.text = text;
		this.isComplete = isComplete;
		this.id = id;
	}
}
