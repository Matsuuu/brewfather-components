export async function getBrewFatherJsonFromFile(file) {
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader();
            reader.addEventListener("load", (event) => {
                const fileData = event.target.result;
                if (typeof fileData === "string") {
                    const base64JsonData = fileData.split(",")[1];
                    const decrypted = atob(base64JsonData);
                    const brewFatherJson = JSON.parse(decrypted);
                    resolve(brewFatherJson);
                }
            });
            reader.readAsDataURL(file);
        } catch (ex) {
            reject(ex);
        }
    });
}