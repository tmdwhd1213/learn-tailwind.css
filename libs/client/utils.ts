export function cls(...classNames: string[]) {
  return classNames.join(" ");
}

export function splitWord(word: string) {
  return word?.split(" ")[0];
}
