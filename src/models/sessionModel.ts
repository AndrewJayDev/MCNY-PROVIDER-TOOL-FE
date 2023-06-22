import { Action, action } from "easy-peasy";
import jwt from 'jsonwebtoken';


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
   setSession: Action<ISessionModel, ISession>;
   setSignedIn: Action<ISessionModel, boolean>;
   setJwtExpiration: Action<ISessionModel, string>;

}

export const SessionModel: ISessionModel = {
    session: {} as ISession,
    signedIn: false as boolean,
    jwtToken: '',
    expiration: '',
    setSession: action((state, payload) => {
        state.session = payload;
    }),
    setSignedIn: action((state, payload) => {
        state.signedIn = payload;
    }),
    setJwtExpiration: action((state, expiration) => {
        state.expiration = expiration;
    })
   
}