export function handleIsSingleOrPlurals(items=[]){
    if(Array.isArray(items)){
        if(items.length === 1){
            return "";
        } 
        if(items.length > 1){
            return "s";
        } 
    }
}