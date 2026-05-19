package com.sms.student_management_system.repository;

import com.sms.student_management_system.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository
        extends JpaRepository<Attendance, Long> {

    List<Attendance> findByEnrollmentId(Long enrollmentId);

    Optional<Attendance> findByEnrollmentIdAndDate(
            Long enrollmentId,
            LocalDate date
    );
}