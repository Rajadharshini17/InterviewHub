package com.app.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.app.entity.InterviewExperience;
public interface ExperienceRepository extends JpaRepository<InterviewExperience, Integer> {
List<InterviewExperience> findByStatus(String status);
List<InterviewExperience> findByCompanyContainingIgnoreCase(String company);
List<InterviewExperience> findByRoleContainingIgnoreCase(String role);
List<InterviewExperience> findByCompanyContainingIgnoreCaseAndRoleContainingIgnoreCase(String company,String role);
boolean existsByUserUserId(int userId); //OK (used only for checking)
void deleteByUser_UserId(int id);
}
