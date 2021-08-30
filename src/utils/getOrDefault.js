export default function getOrDefault(thisMap, key, defaultValue) {
    return thisMap.has(key) ? thisMap.get(key) : defaultValue;
}