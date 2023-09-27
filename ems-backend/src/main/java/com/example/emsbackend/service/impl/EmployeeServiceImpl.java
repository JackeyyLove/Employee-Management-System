package com.example.emsbackend.service.impl;

import com.example.emsbackend.dto.EmployeeDto;
import com.example.emsbackend.entity.Department;
import com.example.emsbackend.entity.Employee;
import com.example.emsbackend.exception.ResourceNotFoundException;
import com.example.emsbackend.mapper.EmployeeMapper;
import com.example.emsbackend.repository.DepartmentRepository;
import com.example.emsbackend.repository.EmployeeRepository;
import com.example.emsbackend.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
    private EmployeeRepository employeeRepository;
    private DepartmentRepository departmentRepository;
    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEmployee((employeeDto));
        Department department = departmentRepository.findById(employeeDto.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException(("Department is not exists with id: " + employeeDto.getDepartmentId())));
        employee.setDepartment(department);
        Employee savedEmployee =  employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cannot found employee with ID: " + id));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployee() {
        List<Employee> listEmployee =  employeeRepository.findAll();
//        List<EmployeeDto> listEmployeeDto = new ArrayList<>();
//        for (int i = 0; i < listEmployee.size(); i++) {
//            listEmployeeDto.add(EmployeeMapper.mapToEmployeeDto(listEmployee.get(i)));
//        }
//        return listEmployeeDto;
        return listEmployee.stream().map((employee -> EmployeeMapper.mapToEmployeeDto(employee)))
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long id, EmployeeDto employeeDto) {
        Employee employee =employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doesn't exist employee with ID:" + id));
        employee.setFirstName(employeeDto.getFirstName());
        employee.setLastName(employeeDto.getLastName());
        employee.setEmail(employeeDto.getEmail());
        Department department = departmentRepository.findById(employeeDto.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException(("Department is not exists with id: " + employeeDto.getDepartmentId())));
        employee.setDepartment(department);
        Employee updatedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(updatedEmployee);
    }

    @Override
    public void deleteEmployee(Long id) {
        Employee employee =employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doesn't exist employee with ID:" + id));
        employeeRepository.deleteById(id);
    }

}
