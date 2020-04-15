import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer, persistCombineReducers} from "redux-persist";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// Reducers
import approvalTeamsList from '../features/ApprovalTeams/_store';
import teamApprovalSchemes from '../features/ApprovalTeams/_components/ApprovalTeamEditor/_store';

export const rootReducer = combineReducers({
  approvalTeams: approvalTeamsList,
  teamApprovalScheme: teamApprovalSchemes,
});

const persistConfig = {
  key: 'spendesk-teams-approvals',
  whitelist: ['teamApprovalScheme'],
  stateReconciler: autoMergeLevel2,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  compose(applyMiddleware(thunk)
  // !!! disabled for Cypress testing (it breaks, badly)
  // window.__REDUX_DEVTOOLS_EXTENSION__ &&
      // window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);
export const persistor = persistStore(store);