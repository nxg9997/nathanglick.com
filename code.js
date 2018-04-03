let gFullList = document.querySelectorAll(".g-entry-full");
let gMinList = document.querySelectorAll(".g-entry-min");
let gEntryList = document.querySelectorAll(".g-entry");
let gpTri = document.querySelector("#g-projects-tri");
let gpDiv = document.querySelector("#g-projects");
let gcTri = document.querySelector("#g-classwork-tri");
let gcDiv = document.querySelector("#g-classwork");

CheckLists();
Initialize();


function CheckLists(){
    console.log(gFullList);
    console.log(gMinList);
    console.log(gEntryList);
}

function Initialize(){
    for (let x = 0; x < gFullList.length; x++)
    {
        //console.log(gFullList[x]);
        gFullList[x].style.display = 'none';
    }

    for (let x = 0; x < gEntryList.length; x++)
    {
        gEntryList[x].onmouseover = OpenDetails;
        gEntryList[x].onmouseleave = CloseDetails;
    }

    gpTri.onmousedown = OpenProjects;
    gcTri.onmousedown = OpenClasswork;
}

function OpenDetails(e){
    console.log(e);
    /*for (let x = 0; x < e.path.length; x ++)
    {
        if (e.path[x].className == 'g-entry')
        {
            expand = e.path[x].querySelectorAll(".g-entry-full");
        }
    }*/

    let expand = e.target.parentElement.parentElement.querySelectorAll(".g-entry-full");
    //console.log("expand: " + expand.className);
    //let expand = e.fromElement.querySelectorAll(".g-entry-full");
    //let min = e.fromElement.querySelectorAll(".g-entry-min");
    /*let entry = e.fromElement;
    if (entry.class != 'g-entry')
    {
        entry = entry.fromElement;
    }*/
    for (let x = 0; x < expand.length; x++)
    {
        expand[x].style.display = 'flex';
    }
    /*for (let x = 0; x < min.length; x++)
    {
        min[x].style.display = 'none';
    }*/
}

function CloseDetails(e){
    /*console.log(e.fromElement);
    for (let x = 0; x < e.path.length; x ++)
    {
        if (e.path[x].className == 'g-entry')
        {
            expand = e.path[x].querySelectorAll(".g-entry-full");
        }
    }*/
    let expand = e.target.parentElement.parentElement.querySelectorAll(".g-entry-full");

    //let min = e.fromElement.querySelectorAll(".g-entry-min");
    for (let x = 0; x < expand.length; x++)
    {
        expand[x].style.display = 'none';
    }
    /*for (let x = 0; x < min.length; x++)
    {
        min[x].style.display = 'inline';
    }*/
}

let pCtrl = true;

function OpenProjects(){
    if (!pCtrl){
        gpDiv.style.display = 'flex';
        pCtrl = true;
        gpTri.style.transform = 'rotate(90deg)';
    }
    else{
        gpDiv.style.display = 'none';
        pCtrl = false;
        gpTri.style.transform = 'rotate(0deg)';
    }
    
}

let cCtrl = true;

function OpenClasswork(){
    if (!cCtrl){
        gcDiv.style.display = 'flex';
        cCtrl = true;
        gcTri.style.transform = 'rotate(90deg)';
    }
    else{
        gcDiv.style.display = 'none';
        cCtrl = false;
        gcTri.style.transform = 'rotate(0deg)';
    }
    
}