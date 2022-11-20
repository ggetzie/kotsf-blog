export default function getOrDefault(
  thisMap: Map<any, any>,
  key: string,
  defaultValue: any
) {
  return thisMap.has(key) ? thisMap.get(key) : defaultValue
}
