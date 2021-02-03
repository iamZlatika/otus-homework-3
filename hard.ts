// Это сложное (если не супер сложное) задание
// Задача состоит в том что написать калькулято для натуральных чисел, но только на типах!
// Ниже приведена заготовка
// Хочется поддержки сложения и вычитания, если хочется еще челленджа, то деление и умножение
// Из-за ограничений глубины вычислений поддержать все натуральные числа не получится, это нормально
type Equals<A, B> = A extends B ? (B extends A ? "success" : never) : never;

type Add<A extends number, B extends number> = Eval<Sum<A, B>>
type Subtract<A extends number, B extends number> = Eval<Sub<A, B>>
type Multiply<A extends number, B extends number> = Eval<Mul<A, B>>
type Divide<A extends number, B extends number> = Eval<Div<A, B>>

// Tests

type ShouldPass = 
    & AddTest
    & SubtractTest
    & MultiplyTest
    & DivideTest

type ShouldFail = 
    & Equals<Add<4, 2>, 1>
    & Equals<Subtract<4, 2>, 1>
    & Equals<Multiply<4, 2>, 2>
    & Equals<Divide<4, 2>, 3>

type AddTest = 
    & Equals<Add<1, 1>, 2>
    & Equals<Add<1, 2>, 3>
    & Equals<Add<2, 1>, 3>
    & Equals<Add<13, Add<9, 20>>, 42>

type SubtractTest = 
    & Equals<Subtract<2, 1>, 1>
    & Equals<Subtract<3, 1>, 2>
    & Equals<Subtract<27, 12>, 15>
    & Equals<Subtract<Add<4, 7>, 6>, 5>

type MultiplyTest = 
    & Equals<Multiply<1, 1>, 1>
    & Equals<Multiply<1, 2>, 2>
    & Equals<Multiply<2, 2>, 4>
    & Equals<Multiply<3, 2>, 6>
    & Equals<Multiply<2, 3>, 6>
    & Equals<Multiply<6, 7>, 42>

type DivideTest = 
    & Equals<Divide<1, 1>, 1>
    & Equals<Divide<2, 1>, 2>
    & Equals<Divide<3, 1>, 3>
    & Equals<Divide<4, 2>, 2>
    & Equals<Divide<12, 4>, 3>

// Implementation

type A = Expand<[5]>

type Eval<T extends any[]> = T["length"]
type First<T extends number[]> = T[0]
type Expand<T extends number[]> = First<T> extends Eval<T> 
    ? T 
    : Expand<[...T, First<T>]>

type Sum<A extends number, B extends number> = [...Expand<[A]>, ...Expand<[B]>]

type Sub<A extends number, B extends number> = SubInner<[A], B>
type SubInner<A extends number[], B extends number> = Eval<Sum<Eval<A>, B>> extends First<A> 
    ? A 
    : SubInner<[...A, First<A>], B>

type Mul<A extends number, B extends number> = MulInner<Expand<[A]>, Expand<[A]>, Expand<[B]>>
type MulInner<R extends number[], A extends number[], B extends number[]> = Eval<B> extends 1 
    ? R 
    : MulInner<[...R, ...A], A, Sub<Eval<B>, 1>>

type Div<A extends number, B extends number> = DivInner<[42], A, B>
type DivInner<R extends number[], A extends number, B extends number> = Eval<Mul<B, Eval<R>>> extends A 
    ? R 
    : DivInner<[...R, 42], A, B>