import { Action, Thunk, action, thunk } from "easy-peasy";
import { stat } from "fs";

export interface ISessionRequest{
    id: number;
    date: string;
    sessionCode: string;
    patientFirstName: string;
    patientLastName: string;
    clinicianFirstName: string;
    clinicianLastName: string;
    clinicianEmail: string;
}

export interface IRequestModel {
    sessions: ISessionRequest[];
    addSession: Action<IRequestModel, object[]>;
    firstName: string;
    lastName: string;
    email: string;
    setFirstName: Action<IRequestModel, string>;
    setLastName: Action<IRequestModel, string>;
    setEmail: Action<IRequestModel, string>;
    deleteSession: Action<IRequestModel, number>;
    modifySession: Action<IRequestModel, ISessionRequest>;
    submitRequest: Thunk<IRequestModel>;
};

export const RequestModel = {
    sessions: [] as ISessionRequest[],
    addSession: action((state, payload:ISessionRequest) => {
        state.sessions.push(payload) 
    }),
    deleteSession: action((state, payload:number) => {
        state.sessions = state.sessions.filter((session) => session.id !== payload);
    }),
    modifySession: action((state, payload:ISessionRequest) => {
        state.sessions = state.sessions.map((session) => {
            if(session.id === payload.id){
                session = payload;
            }
        });
    }),
    firstName: '',
    lastName: '',
    email: '',
    setFirstName: action((state, payload:string) => {
        state.firstName = payload;
    }   ),  
    setLastName: action((state, payload:string) => {
        state.lastName = payload;
    }),
    setEmail: action((state, payload:string) => {
        state.email = payload;
    }),
    submitRequest: thunk(async (state, payload, {getStoreActions,getState} ) => {
       //const response = await getStoreActions().axiosModel.post({endpoint: 'Request/CreateRequest', params: payload});
       const newState = getState();
       console.log(newState);
       
    //    const request = {
    //         firstName: getState. state.firstName,
    //         lastName: state.lastName,
    //         email: state.email,
    //         sessions: state.sessions
    //     }
    //     console.log(payload);
    })
        
    
    
};