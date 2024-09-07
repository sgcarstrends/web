import { create } from "zustand";
import { COEAction, createCoeSlice } from "@/app/store/coeSlice";
import { createDateSlice, DateAction, DateState } from "@/app/store/dateSlice";
import type { CoeSlice } from "@/app/store/coeSlice";

type State = DateState & CoeSlice;
type Action = DateAction & COEAction;

const useStore = create<State & Action>((...a) => ({
  ...createDateSlice(...a),
  ...createCoeSlice(...a),
}));

export default useStore;
