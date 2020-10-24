import React from 'react'


interface IinitState {
    auth : boolean,
    passwords : any []
}

const initState = {
    auth : false,
    passwords : [] 
}

const reducer = (state: IinitState, action: any) => {

    switch(action.type) {

        case "authendicate": 
            return {
                ...state,
                auth : true
            }
        case "passwords":
            return {
                ...state,
                passwords : [...action.payload]
            }
        case "newPassword":
            return {
                ...state,
                passwords : [{...action.payload},...state.passwords]
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