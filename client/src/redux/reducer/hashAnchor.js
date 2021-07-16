import * as CONST from "../actionTypes"

const initState={
    hashLink:""
}

const reducer=(state=initState, action)=>{
    const {ANCHORLINK} =CONST
switch(action.type){
    case ANCHORLINK:
        return {...state,hashLink:action.payload}
    default:
        return state
}
}

export default reducer