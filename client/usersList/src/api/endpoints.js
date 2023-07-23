import axios from './axiosInstance';

export function getUsers() {
    return axios.get('/user/users');
}

export function createUser(credentials) {
    return axios.post('/user/users/', credentials);
}

export function updateUser(id,credentials){
    return axios.put(`/user/users/${id}`,credentials);
}

export function getSingleUser(id){
    return axios.get(`/user/getSingleUser/${id}`);
}

export function delelteUser(id){
    return axios.delete(`/user/users/${id}`);

}

export function signout(){
    return axios.get('/auth/signout');
}