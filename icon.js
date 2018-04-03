let phone = document.querySelector(".fa-phone");
let email = document.querySelector(".fa-envelope-o");
let twitter = document.querySelector(".fa-twitter");
let linkedin = document.querySelector(".fa-linkedin");

let infoDiv = document.querySelector(".a-icon-info");

let prev = null;
let divCtrl = false;

let pText = "(203) 727 - 2109";
let eText = "nathan.h.glick@gmail.com";
let tText = "@NateGlick";
let lText = "Nathan-Glick";

phone.onmousedown = IconClick;
email.onmousedown = IconClick;
twitter.onmousedown = IconClick;
linkedin.onmousedown = IconClick;

function IconClick(e){
    if (!prev){
        prev = e.target.className;
        divCtrl = true;
    }
    else if (prev == e.target.className){
        divCtrl = !divCtrl;
    }
    else{
        prev = e.target.className;
        divCtrl = true;
    }

    if (divCtrl)
    {
        infoDiv.style.opacity = '1';
        let text = "";
        switch(e.target.className){
            case 'fa fa-phone':
                text = pText;
                break;
            case 'fa fa-envelope-o':
                text = eText;
                break;
            case 'fa fa-twitter':
                text = tText;
                break;
            case 'fa fa-linkedin':
                text = lText;
                break;
        }
        infoDiv.innerHTML = '<p>' + text + '</p>';
    }
    else
    {
        infoDiv.style.opacity = '0';
    }
}