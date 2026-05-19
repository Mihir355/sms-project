package com.sms.student_management_system.service;

import com.sms.student_management_system.entity.Attendance;
import com.sms.student_management_system.entity.Enrollment;
import com.sms.student_management_system.repository.AttendanceRepository;
import com.sms.student_management_system.repository.EnrollmentRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final EnrollmentRepository enrollmentRepository;

    public AttendanceService(
            AttendanceRepository attendanceRepository,
            EnrollmentRepository enrollmentRepository) {

        this.attendanceRepository = attendanceRepository;
        this.enrollmentRepository = enrollmentRepository;
    }

    public Attendance markAttendance(
            Long enrollmentId,
            Attendance attendance) {

        if (attendance.getDate().isAfter(LocalDate.now())) {

            throw new RuntimeException(
                    "Cannot mark attendance for future dates"
            );
        }

        Enrollment enrollment = enrollmentRepository
                .findById(enrollmentId)
                .orElseThrow(() ->
                        new RuntimeException("Enrollment not found"));

        Attendance existingAttendance =
                attendanceRepository
                        .findByEnrollmentIdAndDate(
                                enrollmentId,
                                attendance.getDate()
                        )
                        .orElse(null);

        if (existingAttendance != null) {

            existingAttendance.setStatus(
                    attendance.getStatus()
            );

            return attendanceRepository.save(
                    existingAttendance
            );
        }

        attendance.setEnrollment(enrollment);

        return attendanceRepository.save(attendance);
    }

    public List<Attendance> getAttendanceByEnrollment(
            Long enrollmentId) {

        return attendanceRepository
                .findByEnrollmentId(enrollmentId);
    }

    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }
}