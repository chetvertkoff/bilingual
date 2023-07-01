export type Callback<T = unknown, R = unknown> = (...args: T[]) => R

export type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never
