package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.entity.Comment;

import jakarta.transaction.Transactional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {

    // ✅ GET COMMENTS FOR AN EXPERIENCE
	@Query("SELECT c FROM Comment c JOIN FETCH c.user WHERE c.experience.id = :expId")
	List<Comment> findByExperienceId(@Param("expId") int expId);

    // ✅ DELETE COMMENTS FOR AN EXPERIENCE
    @Modifying
    @Transactional
    @Query("DELETE FROM Comment c WHERE c.experience.id = :expId")
    void deleteByExperienceId(int expId);
}
