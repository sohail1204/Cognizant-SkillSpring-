package com.junit.basic;

import static org.junit.Assert.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class CalculatorAAATest {

    Calculator calculator;

    @Before
    public void setUp() {
        System.out.println("Setup Method Executed");
        calculator = new Calculator();
    }

    @After
    public void tearDown() {
        System.out.println("Teardown Method Executed");
    }

    @Test
    public void testAddition() {

        // Arrange
        int a = 20;
        int b = 10;

        // Act
        int result = calculator.add(a, b);

        // Assert
        assertEquals(30, result);
    }

    @Test
    public void testMultiplication() {

        // Arrange
        int a = 5;
        int b = 4;

        // Act
        int result = calculator.multiply(a, b);

        // Assert
        assertEquals(20, result);
    }
}