package com.sms.student_management_system.controller;

import com.sms.student_management_system.entity.Attendance;
import com.sms.student_management_system.service.AttendanceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/attendance")
@CrossOrigin("*")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(
            AttendanceService attendanceService) {

        this.attendanceService = attendanceService;
    }

    @PostMapping("/{enrollmentId}")
    public Attendance markAttendance(
            @PathVariable Long enrollmentId,
            @RequestBody Attendance attendance) {

        return attendanceService
                .markAttendance(enrollmentId, attendance);
    }

    @GetMapping("/enrollment/{enrollmentId}")
    public List<Attendance> getAttendance(
            @PathVariable Long enrollmentId) {

        return attendanceService
                .getAttendanceByEnrollment(enrollmentId);
    }

    @GetMapping
    public List<Attendance> getAllAttendance() {
        return attendanceService.getAllAttendance();
    }
}