import axios from "axios";
const DEPARTMENT_REST_API_BASE_URL = 'http://localhost:8080/api/departments'; 
// get all departments API
export const getAllDepartments = () => {
    return axios.get(DEPARTMENT_REST_API_BASE_URL);
}

// add new departmnet API
export const addDepartment = (department) => { 
    return axios.post(DEPARTMENT_REST_API_BASE_URL, department); 
}

// update existing departmnet API
export const updateDepartment = (departmentID, department) => {
    return axios.put(DEPARTMENT_REST_API_BASE_URL + '/' + departmentID, department ); 
}

// get department by ID 
export const getDepartment = (departmentID) => {
    return axios.get(DEPARTMENT_REST_API_BASE_URL + '/' + departmentID); 
}

// delete department by ID 
export const deleteDepartment = (departmentID) => {
    return axios.delete(DEPARTMENT_REST_API_BASE_URL + '/' + departmentID)
}