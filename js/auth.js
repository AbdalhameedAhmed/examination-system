function togglePassword (ele){
    let parent = ele.parentNode 
    let children = parent.children
    for (let child of children){
        if (child.localName == "input" ){
            if (child.type == "text"){
                child.type = "password"
            }else {
                child.type = "text"
            }
        }
        if(child == ele) {
            child.classList.add("hidden")
        }
        if(child.localName == "button"  && child != ele) {
            child.classList.remove("hidden")
        }
    }
    
}