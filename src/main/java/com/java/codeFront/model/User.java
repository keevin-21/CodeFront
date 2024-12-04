package com.java.codeFront.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    @Column(nullable = false, unique = true)
    private String userName;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserBookmark> bookmarks;

    // Constructor vacío (requerido por JPA)
    public User() {}

    // Constructor con parámetros (opcional)
    public User(String userName) {
        this.userName = userName;
    }

    // Getters y Setters
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public List<UserBookmark> getBookmarks() {
        return bookmarks;
    }

    public void setBookmarks(List<UserBookmark> bookmarks) {
        this.bookmarks = bookmarks;
    }

    // toString (opcional)
    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", userName='" + userName + '\'' +
                ", bookmarks=" + bookmarks +
                '}';
    }
}
