import { create } from "zustand";
import {
  type COEAction,
  createCoeSlice,
  type CoeSlice,
} from "@/app/store/coeSlice";
import {
  createDateSlice,
  type DateAction,
  type DateState,
} from "@/app/store/dateSlice";

type State = DateState & CoeSlice;
type Action = DateAction & COEAction;

const useStore = create<State & Action>((...a) => ({
  ...createDateSlice(...a),
  ...createCoeSlice(...a),
}));

export default useStore;
