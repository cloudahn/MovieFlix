import {combineReducers} from "redux"
import movieReducer from "./movieReducer"
import pageReducer from "./pageReducer"

export default combineReducers({
    movie: movieReducer,
    page: pageReducer,
})