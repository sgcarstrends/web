"use client";

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";
import months from "@/data/months.json";

interface GlobalState {
  selectedMonth?: string;
  selectedYear: string;
}

interface GlobalStateContextValue {
  state: GlobalState;
  dispatch: Dispatch<any>;
}

interface GlobalProviderProps extends PropsWithChildren {}

type Action = { type: string; payload: any };

const initialState: GlobalState = {
  selectedMonth: months[0],
  selectedYear: (new Date().getFullYear() - 1).toString(),
};

const globalStateReducer = (
  state: GlobalState,
  action: Action,
): GlobalState => {
  switch (action.type) {
    case "SET_SELECTED_MONTH":
      return { ...state, selectedMonth: action.payload };
    case "SET_SELECTED_YEAR":
      return { ...state, selectedYear: action.payload };
    default:
      return state;
  }
};

export const GlobalStateContext = createContext<
  GlobalStateContextValue | undefined
>(undefined);

export const GlobalStateProvider = ({ children }: GlobalProviderProps) => {
  const [state, dispatch] = useReducer(globalStateReducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};
