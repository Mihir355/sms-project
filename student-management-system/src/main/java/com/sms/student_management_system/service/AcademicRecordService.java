package com.sms.student_management_system.service;

import com.sms.student_management_system.entity.AcademicRecord;
import com.sms.student_management_system.entity.Enrollment;
import com.sms.student_management_system.repository.AcademicRecordRepository;
import com.sms.student_management_system.repository.EnrollmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AcademicRecordService {

    private final AcademicRecordRepository academicRecordRepository;
    private final EnrollmentRepository enrollmentRepository;

    public AcademicRecordService(
            AcademicRecordRepository academicRecordRepository,
            EnrollmentRepository enrollmentRepository) {

        this.academicRecordRepository = academicRecordRepository;
        this.enrollmentRepository = enrollmentRepository;
    }

    public AcademicRecord addRecord(Long enrollmentId,
                                    AcademicRecord academicRecord) {

        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() ->
                        new RuntimeException("Enrollment not found"));

        AcademicRecord existingRecord =
                academicRecordRepository
                        .findByEnrollmentIdAndSemester(
                                enrollmentId,
                                academicRecord.getSemester()
                        )
                        .orElse(null);

        // UPDATE existing record
        if (existingRecord != null) {

            existingRecord.setMarks(
                    academicRecord.getMarks()
            );

            existingRecord.setGrade(
                    academicRecord.getGrade()
            );

            return academicRecordRepository.save(existingRecord);
        }

        // CREATE new record
        academicRecord.setEnrollment(enrollment);

        return academicRecordRepository.save(academicRecord);
    }

    public List<AcademicRecord> getRecordsByEnrollment(
            Long enrollmentId) {

        return academicRecordRepository
                .findByEnrollmentId(enrollmentId);
    }

    public List<AcademicRecord> getAllRecords() {
        return academicRecordRepository.findAll();
    }
}