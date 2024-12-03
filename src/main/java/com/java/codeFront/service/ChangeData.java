package com.java.codeFront.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

@Service
public class ChangeData implements IChangeData{
    private ObjectMapper mapper = new ObjectMapper();
    @Override
    public <T> T getData(String json, Class<T> className) {
        try {
            return mapper.readValue(json, className);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
