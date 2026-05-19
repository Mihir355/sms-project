package com.sms.student_management_system.controller;

import com.sms.student_management_system.entity.Enrollment;
import com.sms.student_management_system.service.EnrollmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/enrollments")
@CrossOrigin("*")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    public EnrollmentController(
            EnrollmentService enrollmentService) {

        this.enrollmentService = enrollmentService;
    }

    @PostMapping("/{studentId}")
    public Enrollment addEnrollment(
            @PathVariable Long studentId,
            @RequestBody Enrollment enrollment) {

        return enrollmentService
                .addEnrollment(studentId, enrollment);
    }

    @GetMapping("/student/{studentId}")
    public List<Enrollment> getEnrollments(
            @PathVariable Long studentId) {

        return enrollmentService
                .getEnrollmentsByStudent(studentId);
    }

    @DeleteMapping("/{enrollmentId}")
    public String deleteEnrollment(
            @PathVariable Long enrollmentId) {

        enrollmentService.deleteEnrollment(enrollmentId);

        return "Enrollment deleted successfully";
    }
}