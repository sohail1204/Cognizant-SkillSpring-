package com.cognizant.ormlearn;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import com.cognizant.ormlearn.model.Country;
import com.cognizant.ormlearn.service.CountryService;

@SpringBootApplication
public class OrmLearnApplication {

    private static final Logger LOGGER =
            LoggerFactory.getLogger(OrmLearnApplication.class);

    private static CountryService countryService;

    public static void main(String[] args) {

        ApplicationContext context =
                SpringApplication.run(OrmLearnApplication.class, args);

        countryService = context.getBean(CountryService.class);

        testGetAllCountries();
        testFindCountryByCode();
        testAddCountry();
    }

    private static void testGetAllCountries() {

        LOGGER.info("Start");

        List<Country> countries = countryService.getAllCountries();

        LOGGER.debug("Countries : {}", countries);

        LOGGER.info("End");
    }
    
    private static void testFindCountryByCode() {

        LOGGER.info("Start");

        try {

            Country country = countryService.findCountryByCode("IN");

            LOGGER.debug("Country : {}", country);

        } catch (Exception e) {

            LOGGER.error(e.getMessage());

        }

        LOGGER.info("End");
    }
    private static void testAddCountry() {

        LOGGER.info("Start");

        Country country = new Country();
        country.setCode("JP");
        country.setName("Japan");

        countryService.addCountry(country);

        try {
            Country c = countryService.findCountryByCode("JP");
            LOGGER.debug("Country : {}", c);
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
        }

        LOGGER.info("End");
    }
}