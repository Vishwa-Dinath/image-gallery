package lk.lms.dvd;

import lk.lms.dvd.api.CorsFilter;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

import javax.servlet.Filter;
import javax.servlet.MultipartConfigElement;
import javax.servlet.ServletRegistration;

public class WebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {
    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class[]{WebRootConfig.class};
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class[]{WebAppConfig.class};
    }

    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }

    @Override
    protected void customizeRegistration(ServletRegistration.Dynamic registration) {
        String osTempDir = System.getProperty("java.io.tmpdir");
        registration.setMultipartConfig(new MultipartConfigElement(osTempDir));
    }

    @Override
    protected Filter[] getServletFilters() {
        return new Filter[]{new CorsFilter()};
    }
}
