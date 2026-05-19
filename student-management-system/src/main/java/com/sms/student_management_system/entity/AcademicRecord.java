package com.sms.student_management_system.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "academic_records")
public class AcademicRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private int marks;

    private String grade;

    private int semester;

    @ManyToOne
    @JoinColumn(name = "enrollment_id")
    private Enrollment enrollment;

    public AcademicRecord() {
    }

    public AcademicRecord(String subject,
                          int marks,
                          String grade,
                          int semester,
                          Enrollment enrollment) {

        this.marks = marks;
        this.grade = grade;
        this.semester = semester;
        this.enrollment = enrollment;
    }

    public Long getId() {
        return id;
    }



    public int getMarks() {
        return marks;
    }

    public void setMarks(int marks) {
        this.marks = marks;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public int getSemester() {
        return semester;
    }

    public void setSemester(int semester) {
        this.semester = semester;
    }

    public Enrollment getEnrollment() {
        return enrollment;
    }

    public void setEnrollment(Enrollment enrollment) {
        this.enrollment = enrollment;
    }
}