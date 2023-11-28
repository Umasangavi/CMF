import axios from 'axios';
import { Constants, Functions } from './imports.utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { serverUrl } from './constant.utils';

export const instance = () => {
  const data = axios.create({
    baseURL: "http://143.110.245.135/api/", 
  });
  data.interceptors.request.use(async function (config) {
    const accessToken = await AsyncStorage.getItem('token');
    // config.headers['authorization'] = accessToken;
    config.headers['authorization'] = "Token 94caf654ea973516d52feecbbe9ad5d7db83f085";

    
    let server = await AsyncStorage.getItem('server');
    // if(server){
    //   config.baseURL = server+"/api/v1"
    // }
    return config;
  });
  return data;
};

export default instance;
