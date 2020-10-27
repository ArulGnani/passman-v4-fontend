import React from 'react'


interface IinitState {
    auth : boolean,
    searchResult: any[],
    orignalPasswords: any[],
    show: any[]
}

const initState = {
    auth : false,
    searchResult : [],
    orignalPasswords: [],
    show: []
}

const reducer = (state: IinitState, action: any) => {

    switch(action.type) {

        case "authendicate": 
            return {
                ...state,
                auth : true
            }
        case "setOrignalPasswordObj":
            return {
                ...state,
                orignalPasswords : [...action.payload]
            }
        case "newPassword":
            return {
                ...state,
                orignalPasswords : [{...action.payload},...state.orignalPasswords]
            }
        case "searchResult":
            return {
                ...state,
                searchResult: [...action.payload]
            }
        case "updateShow":
            return {
                ...state,
                show: [...action.payload]
            }
        default:
            return state
    }
}

interface Icontext {
    state: IinitState,
    dispatch: any
}

const Context = React.createContext({} as Icontext)

export {
    Context,
    reducer,
    initState
}