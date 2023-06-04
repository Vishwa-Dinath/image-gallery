const btnUpload = $('#btn-upload');
const overlayElm = $('#overlay');
const bodyElm = $('body');
const mainElm = $('main');
const REST_API_URL = 'http://localhost:8080/gallery';


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

function loadImages() {
    const jqxhr = $.ajax(`${REST_API_URL}/images`);
    jqxhr.done(imgUrlList=>{
        imgUrlList.forEach(imgUrl=>{
            const divElm = $(`<div class="image"></div>`);
            divElm.css('background-image',`url("${imgUrl}")`)
            mainElm.append(divElm)
        })
    })
}



