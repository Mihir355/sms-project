package com.sms.student_management_system.controller;

import com.sms.student_management_system.entity.DisciplinaryRecord;
import com.sms.student_management_system.service.DisciplinaryRecordService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/disciplinary-records")
@CrossOrigin("*")
public class DisciplinaryRecordController {

    private final DisciplinaryRecordService disciplinaryRecordService;

    public DisciplinaryRecordController(
            DisciplinaryRecordService disciplinaryRecordService) {

        this.disciplinaryRecordService =
                disciplinaryRecordService;
    }

    @PostMapping("/{enrollmentId}")
    public DisciplinaryRecord addRecord(
            @PathVariable Long enrollmentId,
            @RequestBody DisciplinaryRecord disciplinaryRecord) {

        return disciplinaryRecordService.addRecord(
                enrollmentId,
                disciplinaryRecord
        );
    }

    @GetMapping("/enrollment/{enrollmentId}")
    public List<DisciplinaryRecord> getRecords(
            @PathVariable Long enrollmentId) {

        return disciplinaryRecordService
                .getRecordsByEnrollment(enrollmentId);
    }

    @GetMapping
    public List<DisciplinaryRecord> getAllRecords() {
        return disciplinaryRecordService.getAllRecords();
    }
}