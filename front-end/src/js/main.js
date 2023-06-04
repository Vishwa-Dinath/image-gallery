const btnUpload = $('#btn-upload');
const overlayElm = $('#overlay');
const bodyElm = $('body');

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



