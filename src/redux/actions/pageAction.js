function goNextPageGroup(currentPageGroup){
    return (dispatch) => {
        dispatch({
            type:"GO_NEXT_PAGE_GROUP",
            payload:{
                currentPageGroup:currentPageGroup
            }
        })
    }
}

function goBackPageGroup(currentPageGroup){
    return (dispatch) => {
        dispatch({
            type:"GO_BACK_PAGE_GROUP",
            payload:{
                currentPageGroup:currentPageGroup
            }
        })
    }
}

function goFirstPageGroup(currentPageGroup){
    return (dispatch) => {
        dispatch({
            type:"GO_FIRST_PAGE_GROUP",
            payload:{
                currentPageGroup:currentPageGroup
            }
        })
    }
}

function goLastPageGroup(LastPageGroup){
    return (dispatch) => {
        dispatch({
            type:"GO_LAST_PAGE_GROUP",
            payload:{
                currentPageGroup:LastPageGroup
            }
        })
    }
}

function saveCurrentPageInfo(pageObj){
    return (dispatch) => {
        dispatch({
            type:"SAVE_CURRENT_PAGE_INFO",
            payload:{
                pageObj:pageObj
            }
        })
    }
}


export const pageAction = {
    goNextPageGroup,
    goBackPageGroup,
    goFirstPageGroup,
    goLastPageGroup,
    saveCurrentPageInfo,
}