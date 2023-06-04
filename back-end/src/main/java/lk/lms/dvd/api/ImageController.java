package lk.lms.dvd.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletContext;
import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/images")
@CrossOrigin
public class ImageController {

    @Autowired
    private ServletContext servletContext;

    @GetMapping
    public List<String> getImages(UriComponentsBuilder uriComponentsBuilder) {
        List<String> imgUrlList = new ArrayList<>();
        String imgDirPath = servletContext.getRealPath("/images");
        File imgDir = new File(imgDirPath);
        String[] imgFiles = imgDir.list();
        for (String imgFile : imgFiles) {
            UriComponentsBuilder cloneBuilder = uriComponentsBuilder.cloneBuilder();
            String imgUrl = cloneBuilder.pathSegment("images", imgFile).toUriString();
            imgUrlList.add(imgUrl);
        }
        return imgUrlList;
    }
}
