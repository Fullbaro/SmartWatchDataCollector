import { ROW_LENGTH } from '../utils/config/constants'

function str2ab(str) {
    const buf = new ArrayBuffer(str.length * 2) // 2 bytes for each char
    const bufView = new Uint16Array(buf)
    for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i)
    }
    return buf
}

export default class LocalStorage {    
    constructor (fileName = '') {        
        this.fileName = fileName
        this.contentStr = ""
        this.maxRowLength = ROW_LENGTH // X character = 2*x bite
    }

    set(str) {    
        str = str.toString()     
        const file = hmFS.open(this.fileName, hmFS.O_RDWR | hmFS.O_TRUNC | hmFS.O_CREAT);
        const contentBuffer = str2ab(str);

        hmFS.write(file, contentBuffer, 0, contentBuffer.byteLength);
        hmFS.close(file);

    }

    append(str) {
        // Convert string to fix length
        str = str.toString()
        while (str.length < this.maxRowLength)
            str += '¬';

        const file = hmFS.open(this.fileName, hmFS.O_RDWR | hmFS.O_APPEND | hmFS.O_CREAT);
        const contentBuffer = str2ab(str);

        hmFS.write(file, contentBuffer, 0, contentBuffer.byteLength);
        hmFS.close(file);
    
    }

    get(startLine = 0, endLine = Infinity) {
        console.log("IIIIIIIIIIIIT::::::::::::::", this.length(), startLine, endLine)

        const [fsStat, err] = hmFS.stat(this.fileName);
        if (err === 0) {
            const { size } = fsStat;
            const totalLines = size / (this.maxRowLength * 2); // A sorok számát számoljuk ki

            // Ellenőrzés: startLine nem lehet nagyobb, mint az összes sor száma
            if (startLine >= totalLines){
                console.log("Start line greater than total lines")
                return "";
            }
    
            const file = hmFS.open(this.fileName, hmFS.O_RDONLY | hmFS.O_CREAT);
            
            // Számoljuk meg, hány byte-ot kell beolvasni az adott sorokig
            const bytesPerLine = this.maxRowLength * 2; // A sorok hossza byte-ban
            const startByte = startLine * bytesPerLine;
            const endByte = endLine * bytesPerLine;
    
            // Állítsuk be az olvasási pozíciót
            hmFS.seek(file, startByte, hmFS.SEEK_SET);
    
            // Olvassuk be a megfelelő mennyiségű adatot
            const readSize = Math.min(endByte - startByte, size - startByte);
            const fileContentUnit = new Uint16Array(new ArrayBuffer(readSize));
            hmFS.read(file, fileContentUnit.buffer, 0, readSize);
            hmFS.close(file);
    
            try {
                this.contentStr = String.fromCharCode.apply(null, fileContentUnit).replace(/¬+/g, '\n').slice(0, -1);
            } catch (error) {
                console.log("Storage convert error " + error);
            }
        } else if(err === -1){
            console.log(this.fileName, "not exists. Creating it...")
            this.set("")
        } else
            console.log("Storage error " + err);

        return this.contentStr;
    }

    length() {
        const [fsStat, err] = hmFS.stat(this.fileName);
        if (err === 0)
            return fsStat.size / 2 / this.maxRowLength
        else
            return -1
    }

}