package com.java.codeFront.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userID;

    @Column(name = "UserName", nullable = false, unique = true)
    private String userName;

    @Column(name = "UserPassword", nullable = false)
    private String userPassword;

    @Column(name = "Bookmarks")
    private String bookmarks;

    // Getters y Setters
    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getBookmarks() {
        return bookmarks;
    }

    public void setBookmarks(String bookmarks) {
        this.bookmarks = bookmarks;
    }
}
