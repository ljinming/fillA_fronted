import { configureStore } from '@reduxjs/toolkit';
import { banlanceReducer,homeRankReducer} from './reduce'
export default configureStore({
    reducer:{
        banlance: banlanceReducer,
        home_rank:homeRankReducer
    }
})