package com.sms.student_management_system.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "enrollments")
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String course;

    private LocalDate admissionDate;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @OneToMany(mappedBy = "enrollment",
            cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Attendance> attendanceRecords;

    @OneToMany(mappedBy = "enrollment",
            cascade = CascadeType.ALL)
    @JsonIgnore
    private List<AcademicRecord> academicRecords;

    @OneToMany(mappedBy = "enrollment",
            cascade = CascadeType.ALL)
    @JsonIgnore
    private List<DisciplinaryRecord> disciplinaryRecords;

    public Enrollment() {
    }

    public Enrollment(String course,
                      LocalDate admissionDate,
                      Student student) {

        this.course = course;
        this.admissionDate = admissionDate;
        this.student = student;
    }

    public Long getId() {
        return id;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public LocalDate getAdmissionDate() {
        return admissionDate;
    }

    public void setAdmissionDate(LocalDate admissionDate) {
        this.admissionDate = admissionDate;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public List<Attendance> getAttendanceRecords() {
        return attendanceRecords;
    }

    public void setAttendanceRecords(
            List<Attendance> attendanceRecords) {

        this.attendanceRecords = attendanceRecords;
    }

    public List<AcademicRecord> getAcademicRecords() {
        return academicRecords;
    }

    public void setAcademicRecords(
            List<AcademicRecord> academicRecords) {

        this.academicRecords = academicRecords;
    }

    public List<DisciplinaryRecord> getDisciplinaryRecords() {
        return disciplinaryRecords;
    }

    public void setDisciplinaryRecords(
            List<DisciplinaryRecord> disciplinaryRecords) {

        this.disciplinaryRecords = disciplinaryRecords;
    }
}