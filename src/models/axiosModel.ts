import { Action, Thunk, action, actionOn, thunk } from "easy-peasy";
import axios from 'axios';

interface payload {
    endpoint: string;
    params:Object;
}

export interface IAxiosModel {
 token: string;
 get: Action<IAxiosModel, payload>;
 post: Thunk<IAxiosModel, payload>;
 setToken: Action<IAxiosModel, string>;
}

export const axiosModel : IAxiosModel = {
    token: '' as string,
    setToken: action((state, payload) => {
        state.token = payload;
    }),
    get: action((state, payload: payload) => {
        console.log(payload);
        axios.get(`${import.meta.env.VITE_BASEURLAPI}${payload.endpoint}`,{headers: {Authorization: `Bearer ${state.token}`}})
        .then(function (response) {
            // handle success
            return response;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }),
    post: thunk(async (state, payload: payload, {getStoreState}) => {
        try {
           const token = getStoreState().axiosModel.token;
            return await axios.post(`${import.meta.env.VITE_BASEURLAPI}${payload.endpoint}`,payload.params,{headers: {Authorization: `Bearer ${token}`}})
        } catch (error) {
            console.log(error); 
        };

    })

};