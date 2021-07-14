import AsyncStorage from "@react-native-async-storage/async-storage";
import IStorageStrategy from "./IStorageStrategy";

export default class AsyncStorageStrategy implements IStorageStrategy {
	async get(key: string) {
		return await AsyncStorage.getItem(key);
	}

	async set(key: string, val: any) {
		return await AsyncStorage.setItem(key, JSON.stringify(val));
	}
}
