package com.sms.student_management_system.controller;

import com.sms.student_management_system.entity.Admin;
import com.sms.student_management_system.service.AdminService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/register")
    public Admin register(@RequestBody Admin admin) {
        return adminService.register(admin);
    }

    @PostMapping("/login")
    public String login(@RequestBody Admin admin) {

        boolean success = adminService.login(
                admin.getUsername(),
                admin.getPassword()
        );

        if (success) {
            return "Login successful";
        }

        return "Invalid username or password";
    }
}