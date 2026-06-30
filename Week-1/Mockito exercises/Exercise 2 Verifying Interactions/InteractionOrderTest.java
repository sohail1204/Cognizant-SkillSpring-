package com.mockito.exercise;

import static org.mockito.Mockito.*;

import org.junit.jupiter.api.Test;
import org.mockito.InOrder;

public class InteractionOrderTest {

    @Test
    void testInteractionOrder() {

        ExternalApi api = mock(ExternalApi.class);
        Logger logger = mock(Logger.class);

        api.getData();
        logger.log();

        InOrder order = inOrder(api, logger);

        order.verify(api).getData();
        order.verify(logger).log();
    }
}