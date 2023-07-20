import { Auth } from "aws-amplify";
import { Action, Thunk, ThunkOn, action, thunk, thunkOn, useStoreActions } from "easy-peasy";


interface ISession {
    jwtToken: string;
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    username: string;

}

export interface ISessionModel {
    session: ISession;
    signedIn: boolean;
    jwtToken: string;
    expiration: string;
    group: string;
    setSession: Thunk<ISessionModel, ISession>;
    setSignedIn: Action<ISessionModel, boolean>;
    setJwtExpiration: Action<ISessionModel, string>;
    setGroupThunk: Thunk<ISessionModel>;
    getCurrentSessionThunk: Thunk<ISessionModel>;
    setGroup: Action<ISessionModel, string>;

}

export const SessionModel: ISessionModel = {
    session: {} as ISession,
    signedIn: false as boolean,
    jwtToken: '',
    expiration: '',
    group: '',
    setSession: thunk(async (state, payload, { getStoreActions, getStoreState }) => {
        console.log(payload);
        state.session = payload;
        //set token in axios model
        getStoreActions().axiosModel.setToken(payload.jwtToken);
        console.log(state);
        const response = await getStoreActions().axiosModel.post({ endpoint: 'Auth/GetAuthGroup', params: { Token: payload.jwtToken } });
        state.setGroup(response.data.data.group);
    }),
    setSignedIn: action((state, payload) => {
        state.signedIn = payload;
    }),
    setJwtExpiration: action((state, expiration) => {
        state.expiration = expiration;
    }),
    setGroup: action((state, payload) => {
        state.group = payload;
    }),

    getCurrentSessionThunk: thunk(async (state, payload, { getStoreActions }) => {

        const user = await Auth.currentAuthenticatedUser();
        console.log(user);
        return user;

    }),
    setGroupThunk: undefined
}