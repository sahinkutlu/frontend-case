export type SvgProps = {
  size: number;
};

export type Selectable<T> = T & { selected: boolean };

export type SplittedString = {
  isBold: boolean;
  text: string;
}[];
