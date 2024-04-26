import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key: string, data: string) => {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (error) {
    console.log(error);
  }
};

export const getData = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const removeData = async (key: string) => {
  try {
      await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};