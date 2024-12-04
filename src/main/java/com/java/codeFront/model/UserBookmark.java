package com.java.codeFront.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class UserBookmark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookmarkId;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "newsId", nullable = false)
    private News news;

    @Temporal(TemporalType.TIMESTAMP)
    private Date bookmarkDate = new Date();

    // Constructor vacío (necesario para JPA)
    public UserBookmark() {}

    // Getters y Setters
    public int getBookmarkId() {
        return bookmarkId;
    }

    public void setBookmarkId(int bookmarkId) {
        this.bookmarkId = bookmarkId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public News getNews() {
        return news;
    }

    public void setNews(News news) {
        this.news = news;
    }

    public Date getBookmarkDate() {
        return bookmarkDate;
    }

    public void setBookmarkDate(Date bookmarkDate) {
        this.bookmarkDate = bookmarkDate;
    }
}
