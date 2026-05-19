package com.sms.student_management_system.controller;

import com.sms.student_management_system.entity.AcademicRecord;
import com.sms.student_management_system.service.AcademicRecordService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/academic-records")
@CrossOrigin("*")
public class AcademicRecordController {

    private final AcademicRecordService academicRecordService;

    public AcademicRecordController(
            AcademicRecordService academicRecordService) {

        this.academicRecordService = academicRecordService;
    }

    @PostMapping("/{enrollmentId}")
    public AcademicRecord addRecord(
            @PathVariable Long enrollmentId,
            @RequestBody AcademicRecord academicRecord) {

        return academicRecordService
                .addRecord(enrollmentId, academicRecord);
    }

    @GetMapping("/enrollment/{enrollmentId}")
    public List<AcademicRecord> getRecords(
            @PathVariable Long enrollmentId) {

        return academicRecordService
                .getRecordsByEnrollment(enrollmentId);
    }

    @GetMapping
    public List<AcademicRecord> getAllRecords() {
        return academicRecordService.getAllRecords();
    }
}