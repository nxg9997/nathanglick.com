let phone = "tel:203-727-2109";
let email = "mailto:nathan.h.glick@gmail.com";

export function initVM(){
    var app = new Vue({
        el: '#app',
        data: {
            phone: phone,
            email: email
        }
    });
}

