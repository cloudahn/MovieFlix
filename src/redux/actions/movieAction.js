import api from "../api"

const API_KEY=process.env.REACT_APP_API_KEY

function getDetailInfo(id,page){

    return async (dispatch) => {
        try{
            dispatch({type:"GET_MOVIES_REQUEST"})

            if(page === undefined)
            { 
                const movieBudgetApi = api.get(`movie/${id}?api_key=${API_KEY}&language=en-US`)
                const movieReviewsApi = api.get(`movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`)
                const movieRecommendApi = api.get(`movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`)
                const movieYoutubeKeyApi = api.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`)

                let [movieBudget,movieReviews,movieRecommend,movieYoutubeKey] = await Promise.all([movieBudgetApi,movieReviewsApi,movieRecommendApi,movieYoutubeKeyApi])

                dispatch({
                    type: "GET_DETAILS_SUCCESS",
                    payload: { 
                        movieBudget:movieBudget.data,
                        movieReviews:movieReviews.data,
                        movieRecommend:movieRecommend.data,
                        movieYoutubeKey:movieYoutubeKey.data,
                    }
                })
                
            }
            else
            {
                const movieRecommendApi = api.get(`movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=${page}`)
                let [movieRecommend] = await Promise.all([movieRecommendApi])   
                console.log("movieAction.js 에서 받은 movieRecommend의 ", page, "페이지는???", movieRecommend)

                dispatch({
                    type: "GET_NEXT_PAGE_SUCCESS",
                    payload: { 
                        movieRecommend:movieRecommend.data,
                        review:false,
                    }
                })
            }
        } 
        catch(err){
            dispatch({type: "GET_MOVIES_FAILURE"})
        }
    }
}

function getYoutubeKey(id){

    return async (dispatch) => {
        try{
            dispatch({type:"GET_MOVIES_REQUEST"})


            const movieYoutubeKeyApi = api.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`)

            let [movieYoutubeKey] = await Promise.all([movieYoutubeKeyApi])
                console.log("Youtube key 데이터 수신을 기다리는 중")
                dispatch({
                    type: "GET_YOUTUBE_KEY_SUCCESS",
                    payload: { 
                        movieYoutubeKey:movieYoutubeKey.data,
                    }
                })
                
            }
            
        catch(err){
            dispatch({type: "GET_MOVIES_FAILURE"})
        }
    }
}


function getMovies(obj){

    let {mode, page, query} = obj
    if (page === undefined) {
        page = 1
    }
    console.log("넘어온 페이지 번호는 ?? ", page)

    return async (dispatch) =>{    
        
        try{
                dispatch({type:"GET_MOVIES_REQUEST"})
                const popularMovieApi = api.get(`/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`)
                const topRatedApi = api.get(`/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`)
                const upComingApi = api.get(`/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`)
                const genreApi = api.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`)
                const searchApi = api.get(`/search/movie?api_key=${API_KEY}&query=${query}&include_adult=true&language=en-US&page=${page}`)

                if (mode === "main"){
                    console.log("main 모드에 들어옴")
                    let [popularMovies,topRatedMovies,upComingMovies,genreList] = await Promise.all([
                        popularMovieApi,
                        topRatedApi,
                        upComingApi,
                        genreApi,
                    ])
                    dispatch({
                        type: "GET_MOVIES_SUCCESS",
                        payload: { 
                            popularMovies:popularMovies.data, 
                            topRatedMovies:topRatedMovies.data, 
                            upComingMovies:upComingMovies.data,
                            genreList:genreList.data.genres,
                        }
                    })
                }
                else if(mode === "popular")
                {

                    let [popularMovies,genreList] = await Promise.all([
                        popularMovieApi,
                        genreApi,
                    ])
                    dispatch({
                        type: "GET_POPULAR_MOVIE_SUCCESS",
                        payload: { 
                            popularMovies:popularMovies.data, 
                            genreList:genreList.data.genres,
                        }
                    })
                }
                else{
                    let [searchMovies,genreList] = await Promise.all([
                        searchApi,
                        genreApi,
                    ])
                    dispatch({
                        type: "GET_SEARCH_MOVIES_SUCCESS",
                        payload: { 
                            searchMovies:searchMovies.data, 
                            genreList:genreList.data.genres,
                        }
                    })

                }

        }catch(error){
            dispatch({type: "GET_MOVIES_FAILURE"})
        }    

    }
}

function getSearchedMovie(obj){

    let {page, query} = obj
    if (page === undefined) {
        page = 1
    }

    return async (dispatch) =>{    
        
        try{

            dispatch({type:"GET_MOVIES_REQUEST"})
            const searchApi = api.get(`/search/movie?api_key=${API_KEY}&query=${query}&include_adult=true&language=en-US&page=${page}`)
            const genreApi = api.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`)

            let [searchMovies,genreList] = await Promise.all([
                searchApi,
                genreApi,
            ])

            dispatch({
                type: "GET_SEARCH_MOVIES_SUCCESS",
                payload: { 
                    searchMovies:searchMovies.data, 
                    genreList:genreList.data.genres,
                }
            })

        }
        catch(error){
            dispatch({type: "GET_MOVIES_FAILURE"})
        }
    }
}

function getSortedMovie(obj){

    console.log("getSortedMovie 리듀서에서 넘겨받은 obj 값 ?? ",obj)
    let {page, order} = obj
    if (page === undefined) {
        page = 1
    }

    if (order === undefined){
        order = "popularity.asc"
    }

    console.log("리듀서 내에서 받은 order 는 ?? ",order)
    return async (dispatch) =>{    
        
        try{

            dispatch({type:"GET_MOVIES_REQUEST"})
            const sortApi = api.get(`/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&sort_by=${order}&page=${page}`)
            const genreApi = api.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`)

            let [sortMovies,genreList] = await Promise.all([
                sortApi,
                genreApi,
            ])

            dispatch({
                type: "GET_SORT_MOVIES_SUCCESS",
                payload: { 
                    sortMovies:sortMovies.data, 
                    genreList:genreList.data.genres,
                }
            })

        }
        catch(error){
            dispatch({type: "GET_MOVIES_FAILURE"})
        }
    }
}

function getFilteredMovies(obj){

    let {page} = obj
    if (page === undefined) {
        page = 1
    }

    return async (dispatch) => {

        try{

            dispatch({type:"GET_MOVIES_REQUEST"})
            const filterApi = api.get(`/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&primary_release_date.gte=${obj.startDate}&primary_release_date.lte=${obj.endDate}&page=${page}`)
            const genreApi = api.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`)

            let [filterMovies,genreList] = await Promise.all([
                filterApi,
                genreApi,
            ])

            dispatch({
                type: "GET_FILTERED_MOVIES_SUCCESS",
                payload: { 
                    filterMovies:filterMovies.data, 
                    genreList:genreList.data.genres,
                }
            })

        }
        catch(error){
            dispatch({type: "GET_MOVIES_FAILURE"})
        }
    }
}

function getGenreMovies(obj){

    let {page} = obj
    if (page === undefined) {
        page = 1
    }
    let {id} = obj

    return async (dispatch) => {

        try{

            dispatch({type:"GET_MOVIES_REQUEST"})
            const findGenreApi = api.get(`/discover/movie?api_key=${API_KEY}&with_genres=${id}&page=${page}`)
            const genreApi = api.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`)

            let [findGenreMovies,genreList] = await Promise.all([
                findGenreApi,
                genreApi,
            ])

            dispatch({
                type: "GET_GENRE_MOVIES_SUCCESS",
                payload: { 
                    findGenreMovies:findGenreMovies.data, 
                    genreList:genreList.data.genres,
                }
            })

        }
        catch(error){
            dispatch({type: "GET_MOVIES_FAILURE"})
        }
    }
}

function getReview(){
    return (dispatch) => {
        dispatch({type:"GET_REVIEW"})
    }
}

function getRecommendMovie(){
    return (dispatch) => {
        dispatch({type:"GET_RECOMMEND_MOVIE"})
    }
}

function getFavoriteAdd(favoriteObj){
    return (dispatch) => {
        dispatch({
            type: "GET_FAVORITE_ADD_SUCCESS",
            payload: { 
                favoriteObj:favoriteObj
            }
        })
    }
}

function getFavoriteDelete(movieId){
    return (dispatch) => {
        dispatch({
            type: "GET_FAVORITE_DELETE_SUCCESS",
            payload: { 
                movieId:movieId
            }
        })
    }
}



export const movieAction = {
    getMovies,
    getDetailInfo,
    getReview,
    getRecommendMovie,
    getYoutubeKey,
    getSearchedMovie,
    getSortedMovie,
    getFilteredMovies,
    getGenreMovies,
    getFavoriteAdd,
    getFavoriteDelete,
}