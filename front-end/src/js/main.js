const btnUpload = $('#btn-upload');
const overlayElm = $('#overlay');
const dropZone = $('#drop-zone');
const bodyElm = $('body');
const mainElm = $('main');
const REST_API_URL = 'http://localhost:8080/gallery';
const loadElm = $('<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>')


loadImages();

btnUpload.on('click',()=>{
    overlayElm.removeClass("d-none");
});
bodyElm.on('keydown',(eventData)=>{
    console.log(eventData.code);
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
    const imgFiles = Array.from(droppedFiles).filter(file=>file.type.startsWith("image/"));
    if (!imgFiles.length) return;
    overlayElm.addClass('d-none');
    uploadImages(imgFiles)
});

function loadImages() {
    const jqxhr = $.ajax(`${REST_API_URL}/images`);
    jqxhr.done(imgUrlList=>{
        imgUrlList.forEach(imgUrl=>{
            const divElm = $(`<div class="image"></div>`);
            divElm.css('background-image',`url("${imgUrl}")`)
            mainElm.append(divElm);
        })
    })
}

function uploadImages(imgFiles) {
    const formData = new FormData();
    imgFiles.forEach(imgFile=>{
        const imgElm = $('<div class="image loader"></div>');
        imgElm.append(loadElm);
        mainElm.append(imgElm);
        formData.append("images", imgFile);
    });

    const jqxhr = $.ajax(`${REST_API_URL}/images`,{
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



