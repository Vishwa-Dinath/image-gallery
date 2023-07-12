import {saveAs} from 'file-saver'

const btnUpload = $('#btn-upload');
const overlayElm = $('#overlay');
const dropZone = $('#drop-zone');
const bodyElm = $('body');
const mainElm = $('main');
const REST_API_URL = 'http://localhost:8080/gallery';
const loadElm = $('<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>')
let existingImageList = [];


loadImages();

btnUpload.on('click',()=>{
    overlayElm.removeClass("d-none");
    console.log(existingImageList)
});
bodyElm.on('keydown',(eventData)=>{
    if (eventData.code==='Escape' && !overlayElm.hasClass('d-none')) overlayElm.addClass('d-none');
});
overlayElm.on('click',(eventData)=>{
    if (eventData.target===overlayElm[0]) overlayElm.addClass('d-none');
});
dropZone.on('dragover', (evt) => evt.preventDefault());
overlayElm.on('dragover', (evt) => evt.preventDefault());
overlayElm.on('drop', (evt) => evt.preventDefault());
dropZone.on('drop', (evt) => {
    evt.preventDefault();
    const droppedFiles = evt.originalEvent.dataTransfer.files;
    let imgFiles = Array.from(droppedFiles).filter(file=>file.type.startsWith("image/"));
    console.log(imgFiles)
    if (!imgFiles.length) return;
    let cloneImageFiles = imgFiles.slice();
    imgFiles.forEach(img=>{
        existingImageList.forEach(existingImage=>{
            if (img.name==existingImage.replace(REST_API_URL,"").replace("/","").replace("images","").replace("/","")){
                alert(`${img.name} already exists`);
                cloneImageFiles=cloneImageFiles.filter(image=> image.name != existingImage.replace(REST_API_URL,"").replace("/","").replace("images","").replace("/",""));
            }
        })
    })
    imgFiles = cloneImageFiles;
    if (!imgFiles.length) return;
    overlayElm.addClass('d-none');
    uploadImages(imgFiles)
});
mainElm.on('click','.image:not(.download-icon)',(evt)=>{
    if (!$(evt.target).hasClass('.download-icon')) evt.target.requestFullscreen();
})
mainElm.on('click','.image .download-icon',(evt)=>{
    evt.stopPropagation();
    // const imgUrl = $(evt.target).parents(".image").css('background-image').replace("url(","").replace(")","");
    // const fileName = imgUrl.replace(REST_API_URL,"").replace("/","").replace("images","").replace("/","");
    const imgUrl = $(evt.target).parents(".image").css('background-image').replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
    const fileName = imgUrl.substring(imgUrl.lastIndexOf('/') + 1);
    saveAs(imgUrl, fileName);
})


function loadImages() {
    const jqxhr = $.ajax(`${REST_API_URL}/img`);
    jqxhr.done(imgUrlList=>{
        existingImageList = imgUrlList;
        imgUrlList.forEach(imgUrl=>{
            const divElm = $(`<div class="image">
                                    <div class="download-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" class="bi bi-download" viewBox="0 0 16 16">
                                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                        </svg>
                                    </div>
                              </div>`);
            divElm.css('background-image',`url("${imgUrl}")`)
            mainElm.append(divElm);
        })
    })
}

function uploadImages(imgFiles) {
    const formData = new FormData();
    imgFiles.forEach(imgFile=>{
        const imgElm = $('<div class="image loader"><div class="download-icon"></div></div>');
        imgElm.append(loadElm);
        mainElm.append(imgElm);
        formData.append("images", imgFile);
    });

    const jqxhr = $.ajax(`${REST_API_URL}/img`,{
        method:'POST',
        data:formData,
        processData:false,
        contentType:false
    });
    jqxhr.done(imgUrlList=>{
        imgUrlList.forEach(imgUrl=>{
            const imgElm = $('.image.loader').first();
            imgElm.css('background-image',`url("${imgUrl}")`);
            imgElm.empty();
            imgElm.removeClass('loader');
        })
    })

}



