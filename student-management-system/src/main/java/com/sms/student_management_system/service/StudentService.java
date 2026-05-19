package com.sms.student_management_system.service;

import com.sms.student_management_system.entity.Student;
import com.sms.student_management_system.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student updateStudent(Long id, Student updatedStudent) {

        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Student not found"));

        existingStudent.setFirstName(updatedStudent.getFirstName());
        existingStudent.setLastName(updatedStudent.getLastName());
        existingStudent.setEmail(updatedStudent.getEmail());
        existingStudent.setPhone(updatedStudent.getPhone());

        return studentRepository.save(existingStudent);
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
    public Student addStudent(Student student) {

        Student existingStudent =
                studentRepository.findByEmail(student.getEmail())
                        .orElse(null);

        if (existingStudent != null) {

            boolean samePerson =
                    existingStudent.getFirstName().equalsIgnoreCase(student.getFirstName())
                            &&
                            existingStudent.getLastName().equalsIgnoreCase(student.getLastName())
                            &&
                            existingStudent.getPhone().equals(student.getPhone());

            if (!samePerson) {
                throw new RuntimeException(
                        "Email already linked to another student"
                );
            }

            return existingStudent;
        }

        student.setStudentCode(
                "STU" + System.currentTimeMillis()
        );

        return studentRepository.save(student);
    }
}