package com.java.codeFront.service;

public interface IChangeData {
    <T> T getData(String json, Class<T> className);
}
