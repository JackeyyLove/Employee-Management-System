package com.example.emsbackend.service.impl;

import com.example.emsbackend.dto.DepartmentDto;
import com.example.emsbackend.entity.Department;
import com.example.emsbackend.exception.ResourceNotFoundException;
import com.example.emsbackend.mapper.DepartmentMapper;
import com.example.emsbackend.repository.DepartmentRepository;
import com.example.emsbackend.service.DepartmentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class DepartmentServiceImpl
        implements DepartmentService {
    DepartmentRepository departmentRepository;
    @Override
    public DepartmentDto createDepartment(DepartmentDto departmentDto) {
        Department department = DepartmentMapper.mapToDepartment(departmentDto);
        Department savedDepartment = departmentRepository.save(department);
        return DepartmentMapper.mapToDepartmentDto(savedDepartment);
    }

    @Override
    public DepartmentDto getDepartment(Long id) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cannot find department with id: " + id));
        return DepartmentMapper.mapToDepartmentDto(department);
    }

    @Override
    public DepartmentDto updateDepartment(Long id, DepartmentDto departmentDto) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cannot find department with id: " + id));

        department.setDepartmentName(departmentDto.getDepartmentName());
        department.setDepartmentDescription(departmentDto.getDepartmentDescription());
        Department updatedDepartment =  departmentRepository.save(department);
        return DepartmentMapper.mapToDepartmentDto(updatedDepartment);
    }

    @Override
    public List<DepartmentDto> getAllDepartment() {
        List<Department> listDepartment = departmentRepository.findAll();
        List<DepartmentDto> listDepartmentDto = new ArrayList<>();
        for (int i = 0; i < listDepartment.size(); i++) {
            listDepartmentDto.add(DepartmentMapper.mapToDepartmentDto(listDepartment.get(i)));
        }
        return listDepartmentDto;
    }

    @Override
    public String deleteDepartment(Long id) {
        Department department = departmentRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Cannot find department with id: " + id));
        if (department != null) {
            departmentRepository.deleteById(id);
            return "Deleted Successfully";
        }
        return null;
    }
}
