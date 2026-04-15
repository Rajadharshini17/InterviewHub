package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {
	List<Notification> findByUserUserId(int userId);
	

boolean existsByUserUserId(int userId);

    void deleteByUserUserId(int userId);


}
