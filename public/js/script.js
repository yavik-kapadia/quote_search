

//event listeners
let authorLinks = document.querySelectorAll("a");
for (authorLink of authorLinks){
    authorLink.addEventListener("click", getAuthorInfo);
}

async function getAuthorInfo(){
    let url = `/api/authors/${this.id}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
}