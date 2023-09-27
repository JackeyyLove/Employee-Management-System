import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { addEmployee , getEmployee, updateEmployee} from "../services/EmployeeService"
import { getAllDepartments } from "../services/DepartmentService"
function EmployeeComponent() { 
    // Store elements get from form 
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [departmentId, setDepartmentId] = useState('')
    const [departments, setDepartment] = useState([])
    const navigator = useNavigate();

    // Store errors from adding form 
    const [errors, setErrors] = useState({ 
        firstName: '',
        lastName: '',
        email: '', 
        department: ''
    })
    // Store parameter id, which represents for update page
    const {id} = useParams();
    
    // handle get employee for update 
    useEffect(() => {
        if(id) { 
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName)
                setLastName(response.data.lastName)
                setEmail(response.data.email)
                setDepartmentId(response.data.departmentId)
            }).catch(error => {
                console.error(error);
            })
        }
    },[id])

    // Get all departments and store to department
    useEffect(() => { 
        getAllDepartments().then((res) => { 
            setDepartment(res.data);
        }).catch(error => {
            console.error(error); 
        })
    })
    // Function to handle form submit
    function handleFirstName(e) { 
        setFirstName(e.target.value)
    }
    function handleLastName(e) { 
        setLastName(e.target.value)
    }
    function handleEmail(e) { 
        setEmail(e.target.value)
    }
    function saveEmployee(e) { 
        e.preventDefault();
        if (validatedForm()) { 
            const employee = {firstName, lastName, email, departmentId}
            if (id) { // if it has ID, which means that we are going to update info
                updateEmployee(id, employee).then(res =>{
                    console.log(res)
                    navigator('/employees')
                })
            } else {
                // send data to repository and navigate to listEmployees 
                addEmployee(employee).then(res => {
                    console.log(res)
                    navigator('/employees')
                })
            }
        }
    
    }
    function titleHeader() {
        if (id) {
            return <h2 className="text-center">update Employee</h2>
        } else {
            return <h2 className="text-center">Add Employee</h2>
        }
    }
    // Check validated adding form (Required infor)
    function validatedForm() { 
        let valid = true; 
        const errorsCopy = {...errors}
        if (firstName.trim()) { 
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'First name is required'; 
            valid = false;
        }
        if (lastName.trim()) { 
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Last name is required'; 
            valid = false;
        }
        if (email.trim()) { 
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Email is required'; 
            valid = false;
        }
        if (departmentId) { 
            errorsCopy.department = '';
        } else  {
            errorsCopy.department = 'Select department'; 
            valid = false; 
        }
        setErrors(errorsCopy)
        return valid; 
    }
    return (
        <div className="container">
            <div className="row">
                <div className="card">
                    {
                        titleHeader()
                    }
                   <div className="card-body">
                        <form action="" className="needs-validation" noValidate>
                            <div className="form-group mb-2">
                                <label htmlFor="" className="form-label">First Name</label>
                                <input type = 'text' placeholder="Enter Employee First Name" name = 'firstName' value={firstName} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} onChange={handleFirstName} ></input>
                                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="" className="form-label">Last Name</label>
                                <input type = 'text' placeholder="Enter Employee Last Name" name = 'lastName' value={lastName} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} onChange={handleLastName}></input>
                                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="" className="form-label">Email</label>
                                <input type = 'text' placeholder="Enter Employee Email" name = 'email' value={email} className={`form-control ${errors.email ? 'is-invalid' : ''}`} onChange={handleEmail}></input>
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="" className="form-label">Department</label>
                                <select className={`form-control ${errors.department ? 'is-invalid' : ''}`}  value = {departmentId} onChange={(e) => setDepartmentId(e.target.value)}>
                                    <option value="Select Department">Select Department</option>
                                    {
                                        departments.map(department => 
                                        <option key={department.id} value = {department.id}>{department.departmentName}</option>
                                        )
                                    }
                                </select>
                                {errors.department && <div className="invalid-feedback">{errors.department}</div>}
                            </div>
                            <button className="btn btn-success" onClick={saveEmployee}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EmployeeComponent