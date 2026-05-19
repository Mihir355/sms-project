package com.sms.student_management_system.repository;

import com.sms.student_management_system.entity.AcademicRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AcademicRecordRepository
        extends JpaRepository<AcademicRecord, Long> {

    List<AcademicRecord> findByEnrollmentId(Long enrollmentId);

    Optional<AcademicRecord>
    findByEnrollmentIdAndSemester(
            Long enrollmentId,
            int semester
    );
}