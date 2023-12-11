let initialState = {
    currentPageGroup : 1,
}

function pageReducer(state=initialState,action) {
    let {type, payload} = action
    switch(type){
        case "GO_NEXT_PAGE_GROUP":
            return {...state, currentPageGroup:payload.currentPageGroup+1} 
        case "GO_BACK_PAGE_GROUP":
            return {...state, currentPageGroup:payload.currentPageGroup-1}
        case "GO_FIRST_PAGE_GROUP":
            return {...state, currentPageGroup:1}
        case "GO_LAST_PAGE_GROUP":
            return {...state, currentPageGroup:payload.currentPageGroup}
        default: 
            return {...state}
    }
}

export default pageReducer