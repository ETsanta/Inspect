export function safeParse(jsonString, defaultValue = []) {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        return defaultValue;
    }
}