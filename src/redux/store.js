/**
 * Created by tzhao on 2018/2/3.
 */
import {createStore} from "redux"
import reducer from "./reducers"

//创建store
const store = createStore(reducer);
export default store
