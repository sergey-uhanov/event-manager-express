import {getFileUrl} from "./get-file-url.js";

// adding a temporary link to an image
export async function addTempLinksImg(data, target = 'events') {

    return await Promise.all(
        data.map(async (item) => {
            if (item.files.length) {
                item.files = await Promise.all(
                    item.files.map(async (file) => {
                        file.url = await getFileUrl(file.key, target);
                        return file;
                    })
                );
            }

            return item;
        })
    );

}