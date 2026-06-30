package com.junit.basic;

import static org.junit.Assert.*;
import org.junit.Test;

public class CalculatorTest {

    Calculator c = new Calculator();

    @Test
    public void testAdd() {
        assertEquals(15, c.add(10, 5));
    }

    @Test
    public void testSubtract() {
        assertEquals(5, c.subtract(10, 5));
    }

    @Test
    public void testMultiply() {
        assertEquals(50, c.multiply(10, 5));
    }

    @Test
    public void testDivide() {
        assertEquals(2, c.divide(10, 5));
    }
}