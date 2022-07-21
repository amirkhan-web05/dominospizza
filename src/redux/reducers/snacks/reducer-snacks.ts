import { TypeSnackList } from './../../../types/index';
import {TypeData, Types} from './../../types/index'

const initialState:TypeSnackList = {
    snacks:[]
}

type TypeInitialState = typeof initialState

export const snacks = (state:TypeInitialState = initialState, action:TypeData):TypeInitialState => {
    switch (action.type) {
        case Types.APP_SNACK: {
            return {
                ...state,
                snacks:action.snacks
            }
        }

        default: {
            return state
        }
    }
}