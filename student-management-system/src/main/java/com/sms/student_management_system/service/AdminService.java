package com.sms.student_management_system.service;

import com.sms.student_management_system.entity.Admin;
import com.sms.student_management_system.repository.AdminRepository;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public Admin register(Admin admin) {
        return adminRepository.save(admin);
    }

    public boolean login(String username, String password) {

        Admin admin = adminRepository.findByUsername(username)
                .orElse(null);

        if (admin == null) {
            return false;
        }

        return admin.getPassword().equals(password);
    }
}