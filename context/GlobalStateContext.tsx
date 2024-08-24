"use client";

import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  useContext,
  useMemo,
  useReducer,
} from "react";

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

  const contextValue = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <GlobalStateContext.Provider value={contextValue}>
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
