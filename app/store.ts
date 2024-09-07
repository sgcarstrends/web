import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  type COEAction,
  type CoeSlice,
  createCoeSlice,
} from "@/app/store/coeSlice";
import {
  createDateSlice,
  type DateAction,
  type DateState,
} from "@/app/store/dateSlice";

type State = DateState & CoeSlice;
type Action = DateAction & COEAction;

const useStore = create<State & Action, [["zustand/persist", unknown]]>(
  persist(
    (...a) => ({
      ...createDateSlice(...a),
      ...createCoeSlice(...a),
    }),
    {
      name: "config",
      partialize: ({ categories }) => ({ categories }),
    },
  ),
);

export default useStore;
