const INITIAL_STATE = {
    titles: {}
}

const titlesReducer = (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case '': return {...state, titles: action.payload}
        default: return state
    }
}

export default titlesReducer;