let name = document.querySelector('.name-H');
let des = document.querySelector(".des-H");
let toType = "Nathan Glick ";
let toType2 = "Game Designer & Programmer ";
let ctrl = 0;
let ctrl2 = 0;
let swap = 0;

console.log(toType[7]);

let updateInterval = setInterval(typeName, 200);

function typeName ()
{
    if (ctrl == toType.length){
        swap = 1;
    }
    console.log(toType.length);
    if (ctrl < toType.length && swap == 0){
        name.innerHTML = toType.substring(0, ctrl);
        if (ctrl % 2 == 1){
            name.innerHTML = name.innerHTML + "|";
        }
        ctrl++;
    }
    else if (ctrl2 < toType2.length && swap == 1){
        des.innerHTML = toType2.substring(0, ctrl2);
        if (ctrl2 % 2 == 1){
            des.innerHTML = des.innerHTML + "|";
        }
        ctrl2++;
    }
}