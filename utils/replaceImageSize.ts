export function replaceImageSize(array: Asset[], name: string) {
    const image = array.find(
        (item) => item.asset_type.toLowerCase() === name.toLowerCase()
    );
    return image ? image.resize_url.replace("{w}x{h}", "227x320") : "undefined";
}