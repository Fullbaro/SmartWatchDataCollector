import { CHUNK_SIZE } from '../utils/config/constants';

export function fetchAndSendChunks(storages, messageBuilder, log) {
    const storageKeys = Object.keys(storages);
    const totalLines = Object.values(storages).reduce((sum, storage) => sum + storage.length(), 0);
    let processedLines = 0;

    function processStorage(index) {
        if (index < storageKeys.length) {
            const storageKey = storageKeys[index];
            const storage = storages[storageKey];
            fetchAndSendChunksRecursive(storage, 0, storageKey, messageBuilder, log, totalLines);
        }
    }

    function updateProgress(lines, storage) {
        processedLines += lines;
        const progress = Math.floor((processedLines / totalLines) * 100);
        log.setProperty(hmUI.prop.MORE, {
            text: `${progress}%`,
        });

        if (processedLines >= totalLines) {
            log.setProperty(hmUI.prop.MORE, {
                text: "DONE",
            });

            // Clear storage
            storage.set("")

            hmUI.scrollToPage(1, false)
        }
    }

    processStorage(0);

    function fetchAndSendChunksRecursive(storage, startLine, storageKey, messageBuilder, log, totalLines) {
        const endLine = startLine + CHUNK_SIZE;
        const content = storage.get(startLine, endLine);
        console.log("SENDING", storageKey)

        if (content !== "") {
            messageBuilder
                .request({
                    data: content,
                    type: storageKey,
                })
                .then((data) => {                    
                    const { result = {} } = data;
                    const text = JSON.stringify(result); 
                    console.log("Response received", text);
    
                    if (result === "OK") {
                        updateProgress(CHUNK_SIZE, storage);
    
                        if (startLine + CHUNK_SIZE <= totalLines) {                            
                            fetchAndSendChunksRecursive(storage, endLine, storageKey, messageBuilder, log, totalLines);
                        } else {                            
                            checkAllStoragesProcessed();
                        }
                    } else {
                        log.setProperty(hmUI.prop.MORE, {
                            text: text,
                        });
                        console.log("ERROR", text);
                    }
                });
        } else {            
            checkAllStoragesProcessed();
        }
    }
    
    function checkAllStoragesProcessed() {
        const currentIndex = storageKeys.indexOf(currentStorageKey);
        if (currentIndex !== -1 && currentIndex < storageKeys.length - 1) {
            // Van még hátra storage, folytassuk a következővel
            processStorage(currentIndex + 1);
        } else {
            // Minden storage feldolgozásra került
            console.log("Minden storage feldolgozásra került");            
        }
    }
    
    function processStorage(index) {
        if (index < storageKeys.length) {
            currentStorageKey = storageKeys[index];
            const storage = storages[currentStorageKey];
            fetchAndSendChunksRecursive(storage, 0, currentStorageKey, messageBuilder, log, totalLines);
        }
    }
}
