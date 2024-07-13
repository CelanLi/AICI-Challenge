import serviceAxios from "../utils/request"
import {User} from "../App";

export function fetchData (id:number) {
    return serviceAxios<User>({
        url: `/${id}`,
        method: 'GET',
    })
}