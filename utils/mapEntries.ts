export const mapEntries = <T extends { oid: string; name: string }>(items: T[] | null, id: string): T | undefined => {
    return items?.find(item => item.oid === id);
};