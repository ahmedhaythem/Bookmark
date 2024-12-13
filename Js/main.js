var siteName=document.getElementById('siteName');
var websiteURL=document.getElementById('websiteURL');
var btnSubmit=document.querySelector('.btn-submit');
var btnClose=document.querySelector('#closeBtn');
var waringBox=document.getElementById('waring-box');
var nameRegex=/^\w{3,}(\s+\w+)*$/;
var siteRegex=/^\w{3,}\.\w{2,}/;
var siteContainer;

if(localStorage.getItem('sites')!=null){
    siteContainer=JSON.parse(localStorage.getItem('sites'))
    displaySite(siteContainer)
}else{
    siteContainer=[]
}


function addSite(){
    var site={
        siteName:siteName.value,
        siteURL:websiteURL.value
    }
    siteContainer.push(site)
    localStorage.setItem('sites',JSON.stringify(siteContainer))

    displaySite(siteContainer)
    clearForm()
}

btnSubmit.addEventListener('click',function(){
    if(siteName.classList.contains('is-valid') && websiteURL.classList.contains('is-valid')){
        addSite();
    }
    else{
        waringBox.classList.replace('d-none','d-flex')
    }
})




function clearForm(){
    siteName.value=null;
    websiteURL.value=null;
}


function displaySite(arr){
    var cartona='';
    for(var i=0;i<arr.length;i++){
        cartona+=`  <tr>
                        <td>${i+1}</td>
                        <td class="text-capitalize">${arr[i].siteName}</td>
                        <td><button onclick='visitSite(${i})' class="btn btn-visit"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
                        <td><button onclick='deleteSite(${i})' class="btn btn-delete"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
                    </tr>`
    }
    document.getElementById('tableBody').innerHTML=cartona
}


function visitSite(index){
    var visitURL='https://'+siteContainer[index].siteURL;
    window.open(visitURL,'_blank')
}

function deleteSite(index){
    siteContainer.splice(index,1)
    displaySite(siteContainer)
    localStorage.setItem('sites',JSON.stringify(siteContainer))
}

function validInput(input,regex){
    if(regex.test(input.value)){
        input.classList.add('is-valid')
        input.classList.remove('is-invalid')
    }
    else{
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
    }

}


btnClose.addEventListener('click',function(){
    waringBox.classList.replace('d-flex','d-none')
})

siteName.addEventListener('input',function(){
    validInput(siteName,nameRegex)

})

websiteURL.addEventListener('input',function(){
    validInput(websiteURL,siteRegex)
})

