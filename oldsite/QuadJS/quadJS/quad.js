import * as data from "./js/data.js";
import * as main from "./js/main.js";

function init(height=null,width=null,canvas=null){
    if(height == null || width == null || canvas == null){
        data.init();
    }
    else{
        data.init2(height,width,canvas);
    }

    main.init();
}

export class Quad{
    constructor(height=null,width=null,canvas=null){
        init(height,width,canvas);
        this.tree = main.getTree;
    }
}