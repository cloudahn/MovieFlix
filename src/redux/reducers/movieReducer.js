let initialState = {
    popularMovies: {},
    topRatedMovies: {},
    upComingMovies: {},
    loading:true, 
    genreList: [],
    movieBudget: [],
    movieReviews: [],
    movieRecommend: [],
    movieYoutubeKey: [],
    review:false,
    recommendMovie: false,
    youtubeKey: [],
    filterMovies: [],
    currentMode:[],
    favoriteList:[],
}

function movieReducer(state=initialState,action){
    let {type, payload} = action
    switch(type){
        case "GET_MOVIES_REQUEST":
            return {...state, loading:true}
        case "GET_MOVIES_SUCCESS":
            return {...state,
                popularMovies: payload.popularMovies,
                topRatedMovies: payload.topRatedMovies,
                upComingMovies: payload.upComingMovies,
                genreList: payload.genreList,
                loading:false,
                review:false,
                recommendMovie:false,
            }       
        case "GET_POPULAR_MOVIE_SUCCESS":
            return {...state,
                popularMovies: payload.popularMovies,
                genreList: payload.genreList,
                loading:false,
                review:false,
                recommendMovie:false,
            }

        case "GET_SEARCH_MOVIES_SUCCESS":
            return {...state,
                popularMovies: payload.searchMovies,
                genreList: payload.genreList,
                loading:false,
                review:false,
                recommendMovie:false,
            }    

        case "GET_SORT_MOVIES_SUCCESS":
            return {...state,
                popularMovies: payload.sortMovies,
                genreList: payload.genreList,
                loading:false,
                review:false,
                recommendMovie:false,    
            } 
            
                
        case "GET_FILTERED_MOVIES_SUCCESS":
            return {...state,
                popularMovies: payload.filterMovies,
                genreList: payload.genreList,
                loading:false,
                review:false,
                recommendMovie:false,    
            }        

        case "GET_GENRE_MOVIES_SUCCESS":
            return {...state,
                popularMovies: payload.findGenreMovies,
                genreList: payload.genreList,
                loading:false,
                review:false,
                recommendMovie:false,    
            }

        case "GET_DETAILS_SUCCESS":
            return {...state,
                movieBudget: payload.movieBudget,
                movieReviews: payload.movieReviews,
                movieRecommend: payload.movieRecommend,
                movieYoutubeKey: payload.movieYoutubeKey,
                loading:false,
                review:false,
                recommendMovie:false,
            }
        
        case "GET_YOUTUBE_KEY_SUCCESS":
            return {...state,
                movieYoutubeKey: payload.movieYoutubeKey,
                loading:false,
            }


        case "GET_NEXT_PAGE_SUCCESS":
            return {...state,
                movieRecommend: payload.movieRecommend,
                loading:false,
                review:false,
            }
        
        case "GET_FAVORITE_ADD_SUCCESS":
            return {...state,
                favoriteList: state.favoriteList.concat(payload.movieId)
            }
        
        case "GET_FAVORITE_DELETE_SUCCESS":
            return {...state,
                favoriteList: state.favoriteList.filter((element) => element !== payload.movieId)
            }

        case "GET_MOVIES_FAILURE":
            return {...state, loading:false}
        
        case "GET_REVIEW": 
            return {...state, review:true,recommendMovie:false}
        
        case "GET_RECOMMEND_MOVIE":
            return {...state, review:false,recommendMovie:true}

        default:
            return {...state} 
    } 
}

export default movieReducer