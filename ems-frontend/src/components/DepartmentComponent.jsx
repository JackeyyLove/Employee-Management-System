import React, { useState, useEffect } from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import { addDepartment, getDepartment, updateDepartment } from '../services/DepartmentService'

const DepartmentComponent = () => {
    const [departmentName, setDepartmentName] = useState('')
    const [departmentDescription, setDepartmentDescription] = useState('')
    const navigator = useNavigate(); 
    
    // store the errors when typing form 
    const [errors, setErrors] = useState({
        'departmentName': '', 
        'departmentDescription': ''
    })
    const {id} = useParams(); 
    useEffect(() => {
        if(id) { 
            getDepartment(id).then((response) => {
                setDepartmentName(response.data.departmentName)
                setDepartmentDescription(response.data.departmentDescription)
            }).catch(error => {
                console.error(error);
            })
        }
    },[id])
    function saveDepartment(e) { 
        e.preventDefault(); 
        if (validatedForm()) { 
            const department = {departmentName, departmentDescription}
            if (id) { 
                // update department information if exist department
                updateDepartment(id, department).then(res => {
                    console.log(res); 
                    navigator('/departments'); 
                })
            } else {
                // add new department
                addDepartment(department).then((res) => { 
                    console.log(res); 
                    navigator('/departments');
                })
            }
        }
    }

    function validatedForm() { 
        let check = true; 
        const errorsCopy = {...errors}; 
        if (departmentName.trim()) { 
            errorsCopy.departmentName = ''; 
        } else {
            errorsCopy.departmentName = 'Department Name is required'; 
            check = false; 
        }
        if (departmentDescription.trim()) { 
            errorsCopy.departmentDescription = ''; 
        } else {
            errorsCopy.departmentDescription = 'Department Description is required';
            check = false; 
        }
        setErrors(errorsCopy); 
        return check; 
    }   
    function titleHeader() {
        if (id) {
            return <h2 className="text-center">Update department</h2>
        } else {
            return <h2 className="text-center">Add department</h2>
        }
    }
    return (
      <div className='container'>
        <br></br> <br></br>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {
                    titleHeader()
                }
                <div className="card-body">
                    <form action="">
                        <div className="form-group mb-2">
                            <label className='form-label'>Department Name: </label>
                            <input 
                            type="text" 
                            name = 'departmentName' 
                            placeholder='Enter Department Name' 
                            value= {departmentName} 
                            onChange={(e) => setDepartmentName(e.target.value)} 
                            className={`form-control ${errors.departmentName ? 'is-invalid' : ''}`} ></input>
                            {errors.departmentName && <div className="invalid-feedback">{errors.departmentName}</div>}

                        </div>
                        <div className="form-group mb-2">
                            <label className='form-label'>Department Desciption: </label>
                            <input 
                            type="text" 
                            name = 'departmentDescription' 
                            placeholder='Enter Department Description' 
                            value= {departmentDescription} 
                            onChange={(e) => setDepartmentDescription(e.target.value)} 
                            className = {`form-control ${errors.departmentDescription ? 'is-invalid' : ''}`}></input>
                            {errors.departmentDescription && <div className='invalid-feedback'>{errors.departmentDescription}</div>}
                        </div>
                        <button className='btn btn-primary' onClick={(e) => saveDepartment(e)}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DepartmentComponent