package com.example.emsbackend.service;

import com.example.emsbackend.dto.DepartmentDto;

import java.util.List;

public interface DepartmentService {
    DepartmentDto createDepartment(DepartmentDto departmentDto);
    DepartmentDto getDepartment(Long id);
    DepartmentDto updateDepartment(Long id, DepartmentDto departmentDto);
    List<DepartmentDto> getAllDepartment();
    String deleteDepartment(Long id);
}
