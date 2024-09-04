package com.perfree.demoModel;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class DemoModeAspect {

    @Value("${perfree.demoModel}")
    private Boolean demoModel;

    @Before("@annotation(demoMode)")
    public void checkDemoMode(DemoMode demoMode) throws Exception {
       if (demoModel) {
           throw new DemoModelException(demoMode.message());
       }
    }
}
