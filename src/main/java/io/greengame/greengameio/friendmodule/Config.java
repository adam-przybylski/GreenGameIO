package io.greengame.greengameio.friendmodule;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.MongoTransactionManager;

@Configuration
public class Config {
    @Bean
    MongoTransactionManager txManager(MongoDatabaseFactory mongoDbFactory) {
        return new MongoTransactionManager(mongoDbFactory);
    }
}
