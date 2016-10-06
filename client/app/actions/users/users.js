import axios from "axios";
import config from "../../config";

export const USER_ADD = "user/add";
export const USER_REMOVE = "user/remove";
export const USER_UPDATE = "user/update";
export const USER_CLEAR = "user/clear";
export const ERROR = "error";
let nextUserId = 1;

export function userAdd(dto) {
    return {
        type: USER_ADD,
        payload: {
            ...dto,
            id: nextUserId++
        }
    };
}

export function userRemove(id) {
    return {
        type: USER_REMOVE,
        id
    };
}

export function userUpdate(id, user) {
    return {
        type: USER_UPDATE,
        id: id,
        payload: user
    };
}

export function usersLoad(filters) {	
    return function (dispatch) {
        dispatch({
            type: USER_CLEAR
        });
        let params="";
        if(filters){
            params=filters
        	.filter(e=>e.searchValue!=undefined && e.searchValue!=null)
        	.map(e=>e.key+"="+e.searchValue)
        	.join("&");
        }
        axios.get(config.api.url + "/users"+(params.length>0?"?"+params:""))
            .then((data) => {
                dispatch({
                    type: USER_ADD,
                    payload: data.data
                });
            }).catch((error)=> {
                dispatch({
                    type: ERROR,
                    payload: error
                });
            });
    };
}







