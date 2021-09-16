let change = document.getElementsByClassName('dropdown-toggle');


for(let i of change){
    if(i.innerHTML.includes('Completed') ){
        i.classList.add("bg-success");
    }
    else if(i.innerHTML.includes('Incomplete')){
        i.classList.add("bg-danger");
    }
}