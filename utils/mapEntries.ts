export const mapEntries = (array: { [key: string]: string }[] | null, type: string) => {
    return array?.find((item) => item.oid === type);
};