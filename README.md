# React Native Typescript and Redux-thunk
This is an essential example to build React-native app with Expo using Typescript and Redux Thunk.

Step to run
1. Clone the [repo](https://github.com/TobinFrost/react-native-typescript-redux-thunk-template)
2. `yarn install` OR `npm install`
4. `npm run ios` OR `npm run android`


Define actions 

```typescript
import IAction from './IAction'
import { dealService } from "../../service/deal/DealService"
import UtilAction from "../action/UtilAction"

export default class AppAction {
    public static readonly GET_DEALS: string = 'AppAction.GET_DEALS'
    public static readonly DEALS_LOADED: string = 'AppAction.DEALS_LOADED'
    public static readonly SHOW_DEAL_LIST: string = 'AppAction.SHOW_DEAL_LIST'
    public static readonly SHOW_DEAL_DETAIL: string = 'AppAction.SHOW_DEAL_DETAIL'

    public static getDeals = (searchTerm: string | ''): any => {
        return async (dispatch: any, ) => {
            try {
                dispatch ({
                    type: AppAction.GET_DEALS,
                    payload: searchTerm
                })
                let data = await dealService.searchData(searchTerm)
                dispatch ({
                    type: AppAction.DEALS_LOADED,
                    data: data
                })
            }
            catch (_) {
                dispatch ({
                    type: UtilAction.ERROR,
                    errorMessage: "Cannot load deals"
                })
    
            }
        }
    }

    public static setCurrentDeal = (dealId: string): IAction<string, void> => {
        return {
            payload: dealId,
            type: AppAction.SHOW_DEAL_DETAIL
        }
    }

    public static unsetCurrentDeal = (): IAction<void, void> => {
        return {
            type: AppAction.SHOW_DEAL_LIST
        }
    }
}
```

Define reducer 

```typescript
import AppState from "../state/AppState"
import { iDataState } from "../state/IState"
import IAction from "../action/IAction"
import AppAction from "../action/AppAction"
import { Deals } from "../../model/deal/Deal"
import UtilAction from "../action/UtilAction"

export default class AppReducer {
    private static readonly _initialState: AppState = {
        deals: [],
        searchTerm: "",
        currentDealId: null,
        state: iDataState.initial,
        errorMessage: ""
    }

    public static reducer(state: AppState = AppReducer._initialState, action: IAction<any, Deals>): AppState {
        switch (action.type) {
            case AppAction.GET_DEALS:
            return {
                ...state,
                state: iDataState.loading,
                searchTerm: action.payload,
                errorMessage: ""
            }

          case AppAction.DEALS_LOADED:
            return {
                ...state,
                deals: action.data !== null ? action.data!: [],
                state: iDataState.loaded,
                errorMessage: ""
            }

         case AppAction.SHOW_DEAL_LIST:
            return {
                ...state,
                state: iDataState.loaded,
                currentDealId: null
            }

           case AppAction.SHOW_DEAL_DETAIL:
            return {
                ...state,
                currentDealId: action.payload,
                state: iDataState.loading,
                errorMessage: ""
            }

          case UtilAction.ERROR:
            return {
                ...state,
                state: iDataState.error,
                errorMessage: action.error
            }
            default:
                return state
        }
    }

}
```
Thanks to [Thụ CAO](https://www.linkedin.com/in/diegothucao/) for starting the initial project [initial_project](https://github.com/diegothucao/react-native-typescript-redux-thunk-template)


references
1. https://facebook.github.io/react-native/docs/tutorial
2. https://github.com/jscomplete/react-native-essential-training
3. https://www.tutorialspoint.com/es6
4. https://github.com/reduxjs/redux-thunk
5. https://www.tutorialspoint.com/typescript/
