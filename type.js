let name = document.querySelector('.name-H');
let des = document.querySelector(".des-H");
let code = document.querySelectorAll(".code");

let codeT1 = 'char name[] = "Nathan Glick"; ';
let codeT2 = 'char description[] = "Game Designer & Programmer"; ';
let codeT3 = 'std::cout << name << std::endl << description << std::endl; ';

let codeText = new Array();
codeText.push(codeT1);
codeText.push(codeT2);
codeText.push(codeT3);
console.log(codeText);

let toType = "Nathan Glick ";
let toType2 = "Game Designer & Programmer ";
let ctrl = 0;
let ctrl2 = 0;
let codeIndex = 0;
let codeCtrl = 0;
let swap = -1;

console.log(toType[7]);

let updateInt1 = setInterval(typeCode, 50);

function typeName ()
{
    if (ctrl == toType.length){
        swap = 1;
    }
    console.log(toType.length);
    if (ctrl < toType.length && swap == 0){
        name.innerHTML = toType.substring(0, ctrl);
        ctrl++;
    }
    else if (ctrl2 < toType2.length && swap == 1){
        des.innerHTML = toType2.substring(0, ctrl2);
        ctrl2++;
    }
}

function typeCode(){
    console.log(codeCtrl + ", " + codeIndex);
    if(codeIndex == 0 && codeCtrl < codeText[0].length){
        code[0].innerHTML = codeText[0].substring(0, codeCtrl);
        if(codeCtrl % 2 == 0){
            code[0].innerHTML = code[0].innerHTML + '|';
        }
        codeCtrl++;
        if (codeCtrl >= codeText[0].length){
            codeCtrl = 0;
            codeIndex = 1;
        }
    }

    if(codeIndex == 1 && codeCtrl < codeText[1].length){
        code[1].innerHTML = codeText[1].substring(0, codeCtrl);
        if(codeCtrl % 2 == 1){
            code[1].innerHTML = code[1].innerHTML + '|';
        }
        codeCtrl++;
        if (codeCtrl >= codeText[1].length){
            codeCtrl = 0;
            codeIndex = 2;
        }
    }

    if(codeIndex == 2 && codeCtrl < codeText[2].length){
        code[2].innerHTML = codeText[2].substring(0, codeCtrl);
        if(codeCtrl % 2 == 0){
            code[2].innerHTML = code[2].innerHTML + '|';
        }
        codeCtrl++;
        if (codeCtrl >= codeText[2].length){
            codeCtrl = 0;
            codeIndex = 5;
            swap = 0;
            let updateInterval = setInterval(typeName, 75);
        }
    }
}