import type { SplittedString } from "../types/app";

export function splitWithSearchString(mainStr: string, searchStr: string) {
  if (searchStr.length == 0) {
    return [{ isBold: false, text: mainStr }];
  }

  let text = "";
  let result: SplittedString = [];
  let i = 0;

  while (i < mainStr.length) {
    if (i + searchStr.length <= mainStr.length) {
      const sliced = mainStr.slice(i, i + searchStr.length);
      if (equals(sliced, searchStr)) {
        if (text) {
          result.push({
            isBold: false,
            text: text,
          });

          text = "";
        }

        result.push({
          isBold: true,
          text: sliced,
        });

        i = i + searchStr.length;
      }
    }

    text = text + mainStr.charAt(i);
    i++;
  }

  if (text) {
    result.push({
      isBold: false,
      text: text,
    });
  }

  return result;
}

function equals(s1: string, s2: string) {
  return s1.toLowerCase() === s2.toLowerCase();
}
