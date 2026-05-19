package com.sms.student_management_system.repository;

import com.sms.student_management_system.entity.DisciplinaryRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DisciplinaryRecordRepository
        extends JpaRepository<DisciplinaryRecord, Long> {

    List<DisciplinaryRecord> findByEnrollmentId(Long enrollmentId);
}