import { createStore, createTypedHooks } from "easy-peasy";
import model, { StoreModel } from "../models/model";

const { useStoreActions, useStore, useStoreDispatch } = createTypedHooks<StoreModel>();

export { useStoreActions, useStoreDispatch, useStore };

const store = createStore(model);

export default store;