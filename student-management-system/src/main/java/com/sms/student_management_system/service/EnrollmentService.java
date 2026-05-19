package com.sms.student_management_system.service;

import com.sms.student_management_system.entity.Enrollment;
import com.sms.student_management_system.entity.Student;
import com.sms.student_management_system.repository.EnrollmentRepository;
import com.sms.student_management_system.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final StudentRepository studentRepository;

    public EnrollmentService(
            EnrollmentRepository enrollmentRepository,
            StudentRepository studentRepository) {

        this.enrollmentRepository = enrollmentRepository;
        this.studentRepository = studentRepository;
    }

    public Enrollment addEnrollment(
            Long studentId,
            Enrollment enrollment) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() ->
                        new RuntimeException("Student not found"));

        enrollment.setStudent(student);

        return enrollmentRepository.save(enrollment);
    }

    public List<Enrollment> getEnrollmentsByStudent(
            Long studentId) {

        return enrollmentRepository.findByStudentId(studentId);
    }

    public void deleteEnrollment(Long enrollmentId) {

        enrollmentRepository.deleteById(enrollmentId);
    }
}