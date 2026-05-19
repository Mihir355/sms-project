package com.sms.student_management_system.service;

import com.sms.student_management_system.entity.DisciplinaryRecord;
import com.sms.student_management_system.entity.Enrollment;
import com.sms.student_management_system.repository.DisciplinaryRecordRepository;
import com.sms.student_management_system.repository.EnrollmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DisciplinaryRecordService {

    private final DisciplinaryRecordRepository disciplinaryRecordRepository;

    private final EnrollmentRepository enrollmentRepository;

    public DisciplinaryRecordService(
            DisciplinaryRecordRepository disciplinaryRecordRepository,
            EnrollmentRepository enrollmentRepository) {

        this.disciplinaryRecordRepository =
                disciplinaryRecordRepository;

        this.enrollmentRepository =
                enrollmentRepository;
    }

    public DisciplinaryRecord addRecord(
            Long enrollmentId,
            DisciplinaryRecord disciplinaryRecord) {

        Enrollment enrollment =
                enrollmentRepository.findById(enrollmentId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Enrollment not found"));

        disciplinaryRecord.setEnrollment(enrollment);

        return disciplinaryRecordRepository
                .save(disciplinaryRecord);
    }

    public List<DisciplinaryRecord> getRecordsByEnrollment(
            Long enrollmentId) {

        return disciplinaryRecordRepository
                .findByEnrollmentId(enrollmentId);
    }

    public List<DisciplinaryRecord> getAllRecords() {
        return disciplinaryRecordRepository.findAll();
    }
}