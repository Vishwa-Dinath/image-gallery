package lk.lms.dvd.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletContext;
import javax.servlet.http.Part;
import java.io.File;
import java.io.IOException;
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

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void saveImages(@RequestParam("images")List<Part> imgFiles, UriComponentsBuilder uriComponentsBuilder ) {
        if (imgFiles != null) {
            String imgDirPath = servletContext.getRealPath("/images");
            for (Part imgFile : imgFiles) {
                String imgFilePath = new File(imgDirPath, imgFile.getSubmittedFileName()).getAbsolutePath();
                try {
                    imgFile.write(imgFilePath);
                    UriComponentsBuilder cloneBuilder = uriComponentsBuilder.cloneBuilder();
                    String imgUrl = cloneBuilder.pathSegment("images", imgFile.getSubmittedFileName()).toUriString();
                    System.out.println(imgUrl);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
