import { CHUNK_SIZE } from '../utils/config/constants'

function getChunk(obj, from, to) {
    let tmp = { ...obj };

    for (const key in obj) {
        if (Array.isArray(obj[key])) {
            tmp[key] = tmp[key].slice(from, to);
        } else if (typeof tmp[key] === 'object' && tmp[key] !== null) {
            getChunk(tmp[key], from, to);
        }
    }

    return tmp;
}

function getMaxLength(obj) {
    let maxLength = 0;    

    const stack = [{ obj, depth: 0 }];

    while (stack.length > 0) {
        const { obj, depth } = stack.pop();
    
        for (const key in obj) {      
            if (Array.isArray(obj[key])) {              
                if (obj[key].length > maxLength) {
                    maxLength = obj[key].length;                    
                }
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {        
                stack.push({ obj: obj[key], depth: depth + 1 });
            }
        }
    }

    return maxLength;
}

export function fetcher(data_template, messageBuilder, text_widget, localStorage, param, i){    
    const max = Math.ceil(getMaxLength(data) / CHUNK_SIZE)    
    if(max > 0) {

        console.log("SENDING...("+(i+1)+"/"+max+")")
        text_widget.setProperty(hmUI.prop.MORE, {
            text: "SENDING...("+(i+1)+"/"+max+")",
        })
    
        messageBuilder
            .request({      
                data: getChunk(param, (i*CHUNK_SIZE), ((i*CHUNK_SIZE)+ CHUNK_SIZE))
            })
            .then((data) => {
                console.log("receive data");
                const { result = {} } = data;
                //const text = JSON.stringify(result);      
        
                if(result === "OK"){
                    if(i < max-1){
                        fetcher(data_template, messageBuilder, text_widget, localStorage, param, i+1)
                    }else{
                        // Clear storage
                        //! localStorage.set(data_template)          
            
                        text_widget.setProperty(hmUI.prop.MORE, {
                            text: "DONE",
                        })  
                    }
                }else{
                    text_widget.setProperty(hmUI.prop.MORE, {
                        text: "ERROR",
                    })
                }
            });
    } else
        text_widget.setProperty(hmUI.prop.MORE, {
            text: "Nothing to send",
        })
}