import { configureStore } from '@reduxjs/toolkit';
import { banlanceReducer} from './reduce'
export default configureStore({
    reducer:{
        banlance: banlanceReducer,
     
    }
})