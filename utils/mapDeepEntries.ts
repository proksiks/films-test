type DeepRecord = Record<string, any>;

export const mapDeepEntries = <T extends DeepRecord>(
    items: T[] | null,
    id: string,
    field: keyof T = 'oid' as keyof T
): T | undefined => {
    if (!items) return undefined;

    const directMatch = items.find(item => item[field] === id);
    if (directMatch) return directMatch;

    for (const item of items) {
        for (const key in item) {
            const value = item[key];
            
            if (Array.isArray(value)) {
                const found = mapDeepEntries(value, id, field);
                if (found) return found;
            } else if (typeof value === 'object' && value !== null) {
                const found = mapDeepEntries([value], id, field);
                if (found) return found;
            }
        }
    }

    return undefined;
};