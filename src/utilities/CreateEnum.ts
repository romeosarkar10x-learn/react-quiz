/*function createEnum<T extends readonly string[]>(...keys: T) {
    const result = {} as Record<T[number], number>;

    keys.forEach((value: string, index: number) => {
        result[value] = index;
    });
    // return Object.fromEntries(keys.map((value: string, index: number) => [value, index]) as const;

    return result as const as Record<T[number], number>;
}

*/

/*
type ToNumber<S extends string> = S extends `${infer N extends number}` ? N : never;

type CreateEnum<T extends readonly string[]> = {
    readonly [K in keyof T as T[K] extends string ? T[K] : never]: K extends ToNumber<`${K & string}`> ? K : never;
};

type MyEnum = CreateEnum<["none", "correct", "incorrect"]>;

*/

type ToNumber<S extends string> = S extends `${infer N extends number}` ? N : never;

export type CreateEnum<T extends readonly string[]> = {
    readonly [K in keyof T as T[K] extends string ? T[K] : never]: K extends keyof T
        ? ToNumber<`${K & string}`>
        : never;
};

type MyEnum = CreateEnum<["none", "correct", "incorrect"]>;
// Result: { readonly none: 0; readonly correct: 1; readonly incorrect: 2 }
