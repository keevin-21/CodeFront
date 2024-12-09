package com.java.codeFront.model;

import jakarta.persistence.*;

@Entity
@Table(name="News")
public class News {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NewsID")
    private int newsID;

    @Column(nullable = false)
    private String Title;

    @Column(name="short_description")
    private String ShortDescription;

    private String Author;
    private String Source;
    @Column(name = "Url", nullable = false, unique = true)
    private String url;

     @Column(name="publishedAt")
    private String publishedAt;

    public String getPublishedAt() {
        return publishedAt;
    }

    public void setPublishedAt(String publishedAt) {
        this.publishedAt = publishedAt;
    }

    @Column(name = "url_to_image")
    private String urlToImage;

    @Column(name = "content")
    private String content;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getUrlToImage() {
        return urlToImage;
    }

    public void setUrlToImage(String urlToImage) {
        this.urlToImage = urlToImage;
    }

    // Getters y Setters
    public int getNewsID() {
        return newsID;
    }

    public void setNewsID(int NewsID) {
        this.newsID = NewsID;
    }

    public String getTitle() {
        return Title;
    }

    public void setTitle(String Title) {
        this.Title = Title;
    }

    public String getShortDescription() {
        return ShortDescription;
    }

    public void setShortDescription(String ShortDescription) {
        this.ShortDescription = ShortDescription;
    }

    public String getAuthor() {
        return Author;
    }

    public void setAuthor(String Author) {
        this.Author = Author;
    }

    public String getSource() {
        return Source;
    }

    public void setSource(String Source) {
        this.Source = Source;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public String toString() {
        return "News{" +
                "NewsID=" + newsID +
                ", Title='" + Title + '\'' +
                '}';
    }
}