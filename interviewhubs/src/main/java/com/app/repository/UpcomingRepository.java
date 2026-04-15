package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.UpcomingInterview;

public interface UpcomingRepository extends JpaRepository<UpcomingInterview,Integer>{
}
 
