export default interface IStorageStrategy {
	get(key: string): Promise<string | null>;
	set(key: string, val: any): Promise<any>;
}
