import axios from './axiosInstance';

export function getUsers(page, limit) {
    return axios
        .get('/user/users', {
            params: {
                page: page,
                limit: limit,
            },
        })
        .then((response) => {
            console.log("API Response:", response.data);
            return response.data;
        })
        .catch((error) => {
            console.error("Error fetching users:", error);
            throw error;
        });
}

export function createUser(credentials) {
    return axios.post('/user/users/', credentials);
}

export function updateUser(id, credentials) {
    return axios.put(`/user/users/${id}`, credentials);
}

export function getSingleUser(id) {
    return axios.get(`/user/getSingleUser/${id}`);
}

export function delelteUser(id) {
    return axios.delete(`/user/users/${id}`);

}

export function signout() {
    return axios.get('/auth/signout');
}