import React, { useEffect, useState } from 'react'
import { getAllDepartments, deleteDepartment} from '../services/DepartmentService';
import { Link, useNavigate } from 'react-router-dom';
const ListDepartmentComponent = () => {
  // const testData = [
  //   {
  //     'id' : 1, 
  //     'departmentName':  "R&D", 
  //     'departmentDescription': 'Description'
  //   }  
  // ]
  const navigator = new useNavigate();
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    getAllDepartments().then((response) => {
      setDepartments(response.data);
    }).catch(error => {
      console.error(error);
    })
  }, [])
  function updateDepartment(id) {
    navigator(`/edit-department/${id}`)
  }
  function deleteDepartmentById(id) { 
    deleteDepartment(id).then(() => {
      getAllDepartments()
      console.log("Deleted successfully");
    }).catch(error => 
        console.error(error)
      )
  }
  return (
    <div className='container'>
      <h2 className='text-center'>List Of Department</h2>
      <Link to = '/add-department' className = 'btn btn-primary mb-2'>Add department</Link>
      <table className='table table-striped table-bordered'>
        <thead> 
          <tr>
            <th>Department ID</th>
            <th>Department Name</th>
            <th>Department Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            departments.map(department => 
                <tr key ={department.id}>
                  <td>{department.id}</td>
                  <td>{department.departmentName}</td>
                  <td>{department.departmentDescription}</td>
                  <td>
                        <button onClick={() => updateDepartment(department.id)} className = 'btn btn-success'>Update</button>
                        <button onClick={() => deleteDepartmentById(department.id)} className = 'btn btn-danger'>Delete</button>
                    </td>
                </tr>
              )
          }
        </tbody>
      </table>
    </div>
  )
}

export default ListDepartmentComponent