import { createStore, createTypedHooks } from "easy-peasy";
import model, { StoreModel } from "../models/model";

const { useStoreActions, useStore, useStoreDispatch,useStoreState } = createTypedHooks<StoreModel>();

export { useStoreActions, useStoreDispatch, useStore, useStoreState };

const store = createStore(model);

export default store;