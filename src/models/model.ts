
import {SessionModel, ISessionModel} from './sessionModel';
import {axiosModel, IAxiosModel} from './axiosModel';
import { IRequestModel, RequestModel } from './requestModel';

export interface StoreModel {
SessionModel: ISessionModel;
axiosModel: IAxiosModel;
RequestModel: IRequestModel;
};

const model: StoreModel = {
  SessionModel,
  axiosModel,
  RequestModel

};

export default model;