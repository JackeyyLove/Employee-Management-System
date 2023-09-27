package com.example.emsbackend.controller;

import com.example.emsbackend.dto.DepartmentDto;
import com.example.emsbackend.service.DepartmentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/departments")
@AllArgsConstructor
public class DepartmentController {
    private DepartmentService departmentService;
    // Build create department REST API
    @PostMapping
    public ResponseEntity<DepartmentDto> createDepartment(@RequestBody DepartmentDto departmentDto) {
        DepartmentDto savedDepartment = departmentService.createDepartment(departmentDto);
        return new ResponseEntity<>(savedDepartment, HttpStatus.CREATED );
    }

    // Build get department REST API
    @GetMapping("/{id}")
    public ResponseEntity<DepartmentDto> getDepartmnet(@PathVariable("id") Long id) {
        DepartmentDto departmentDto = departmentService.getDepartment(id);
        return  ResponseEntity.ok(departmentDto);
    }
    // Build get all department REST API
    @GetMapping
    public ResponseEntity<List<DepartmentDto>> getAllDepartment() {
        List<DepartmentDto> listDepartmentDto = departmentService.getAllDepartment();
        return ResponseEntity.ok(listDepartmentDto);
    }

    // Build update department REST API
    @PutMapping("/{id}")
    public ResponseEntity<DepartmentDto> updateDepartment(@PathVariable("id") Long id, @RequestBody DepartmentDto departmentDto) {
        DepartmentDto updatedDepartmentDto = departmentService.updateDepartment(id, departmentDto);
        return ResponseEntity.ok(updatedDepartmentDto);
    }

    // Build delete department REST API
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDepartment(@PathVariable("id") Long id) {
        String announcement = departmentService.deleteDepartment(id);
        return ResponseEntity.ok(announcement);
    }
}
