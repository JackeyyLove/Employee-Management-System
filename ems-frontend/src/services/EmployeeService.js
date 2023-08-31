import axios from "axios";
const REST_API_BASE_URL = 'http://localhost:8080/api/employees';

//export const listEmployees = () => axios.get(REST_API_BASE_URL);
// handle List Employees
export const listEmployees = async () => {
    try {
      const response = await axios.get(REST_API_BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching employees:', error);
      return [];
    }
  };
  // handle create an employee
export const addEmployee = async (employee) =>  {
  try { 
    const response = await axios.post(REST_API_BASE_URL, employee);
    return response.data;
  } catch (error) { 
    console.error('Error creating employee:', error);
    return [];
  }
}

//handle update an employee 
export const updateEmployee = async (employeeId, employee) =>  {
  try { 
    const response = await axios.put(REST_API_BASE_URL + '/' + employeeId, employee);
    return response.data;
  } catch (error) { 
    console.error('Error updating employee:', error);
    return [];
  }
}
// handle get information about an employee for updating
export const getEmployee = async (employeeId) => {
  try { 
    const response = await axios.get(REST_API_BASE_URL + '/' + employeeId);
    return response;
  } catch (error) { 
    console.error('Error updating employee:', error);
    return [];
  }
}

// handle delete an employee
export const removeEmployee = async (employeeId) =>  {
  try { 
    const response = await axios.delete(REST_API_BASE_URL + '/' + employeeId);
    return response.data;
  } catch (error) { 
    console.error('Error deleting employee:', error);
    return [];
  }
}