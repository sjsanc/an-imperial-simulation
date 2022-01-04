type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${"" extends P ? "" : "."}${P}`
    : never
  : never;

type Prev = [
  never,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  ...0[]
];

export type Paths<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T]-?: K extends string | number ? `${K}` | Join<K, Paths<T[K], Prev[D]>> : never;
    }[keyof T]
  : "";

export type Leaves<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? { [K in keyof T]-?: Join<K, Leaves<T[K], Prev[D]>> }[keyof T]
  : "";

type NestedObjectPaths = Paths<GameEngine>;
// type NestedObjectPaths = "a" | "b" | "nest" | "otherNest" | "nest.c" | "otherNest.c"
type NestedObjectLeaves = Leaves<GameEngine>;
// type NestedObjectLeaves = "a" | "b" | "nest.c" | "otherNest.c"

// DOT NESTING ATTEMPT 1

type DotPrefix<T extends string> = T extends "" ? "" : `.${T}`;

type DotNestedKeys<T> = (
  T extends object
    ? { [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<DotNestedKeys<T[K]>>}` }[Exclude<
        keyof T,
        symbol
      >]
    : ""
) extends infer D
  ? Extract<D, string>
  : never;

export type DocumentUpdate<T> = Partial<{ [key in DotNestedKeys<T>]: any & T }> & Partial<T>;

type StoreInterfaceKeys = DotNestedKeys<GameEngine> | (string & {});
