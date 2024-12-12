var siteName=document.getElementById('siteName');
var websiteURL=document.getElementById('websiteURL');
var btnSubmit=document.querySelector('.btn-submit');
var namereg=/^\w{3,}(\s+\w+)*$/;
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
    addSite();
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
                        <td><button onclick='deleteSIte(${i})' class="btn btn-delete"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
                    </tr>`
    }
    document.getElementById('tableBody').innerHTML=cartona
}


function visitSite(index){
    var visitURL='https://'+siteContainer[index].siteURL;
    window.open(visitURL,'_blank')
}

function deleteSIte(index){
    siteContainer.splice(index,1)
    displaySite(siteContainer)
    localStorage.setItem('sites',JSON.stringify(siteContainer))
}
