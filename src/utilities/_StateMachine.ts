type UnionToTuple<T extends number> = (
    (T extends any ? (t: T) => T : never) extends infer U
        ? (U extends any ? (u: U) => any : never) extends (v: infer V) => any
            ? V
            : never
        : never
) extends (_: any) => infer W
    ? [...UnionToTuple<Exclude<T, W>>, W]
    : [];

type ValueOf<T extends {}> = T[keyof T];

type __TransitionFunctionsType<EnumStateTypes extends number[], EnumEventTypes extends readonly number[]> = {
    [S in EnumStateTypes[number]]?: {
        [E in EnumEventTypes[number]]?: (
            initialState: { type: S },
            event: { type: E },
        ) => { type: EnumStateTypes[number] };
    };
};

type FinalStateType<TransitionsUnion, InitialState, Event> = TransitionsUnion extends (
    initialState: InitialState,
    event: Event,
) => infer FinalState
    ? FinalState
    : never;

type X = __TransitionFunctionsType<
    UnionToTuple<(typeof eStateType)[keyof typeof eStateType]>,
    UnionToTuple<(typeof eEventType)[keyof typeof eEventType]>
>;

type __PossibleEventTypes<TransitionFunctionsType extends Record<number, unknown>, EnumStateType extends number> =
    ValueOf<{
        [K in keyof TransitionFunctionsType as K extends EnumStateType ? K : never]: TransitionFunctionsType[K];
    }> extends infer T
        ? T extends never
            ? never
            : keyof T
        : never;

type __FinalStateType<
    TransitionFunctionsType extends Record<number, Record<number, (...args: unknown[]) => unknown>>,
    EnumStateType extends number,
    EnumEventType extends number,
> = ValueOf<{
    [K in keyof TransitionFunctionsType as K extends EnumStateType ? K : never]: ValueOf<{
        [L in keyof TransitionFunctionsType[K] as L extends EnumEventType ? L : never]: TransitionFunctionsType[K][L];
    }> extends (initialState: { type: EnumStateType }, event: { type: EnumEventType }) => infer RetType
        ? RetType
        : never;
}>;

class StateMachine<
    EnumStateTypes extends number[],
    EnumEventTypes extends number[],
    TransitionFunctionsType extends __TransitionFunctionsType<EnumStateTypes, EnumEventTypes>,
> {
    constructor(private fTransitions: TransitionFunctionsType) {
        // type ValidEvents<State extends T_States> = T_Transitions
    }

    transition<
        EnumStateType extends keyof TransitionFunctionsType & number,
        EnumEventType extends __PossibleEventTypes<TransitionFunctionsType, EnumStateType> & number,
    >(
        initialState: { type: EnumStateType },
        event: { type: EnumEventType },
    ): __FinalStateType<TransitionFunctionsType, EnumStateType, EnumEventType> {
        const fnsMap = this.fTransitions[initialState.type];
        const fn = (fnsMap as Exclude<typeof fnsMap, undefined>)[event.type] as unknown as (
            initialState: { type: EnumStateType },
            event: { type: EnumEventType },
        ) => __FinalStateType<TransitionFunctionsType, EnumStateType, EnumEventType>;

        return (fn as Exclude<typeof fn, undefined>)(initialState, event);
    }
}

// User's code starts here...

const eStateType = {
    a: 0,
    b: 1,
    c: 2,
} as const;

interface iState {
    type: (typeof eStateType)[keyof typeof eStateType];
}

interface iState_A {
    type: typeof eStateType.a;
}

interface iState_B {
    type: typeof eStateType.b;
}

interface iState_C {
    type: typeof eStateType.c;
}

const eEventType = {
    a: 5,
    b: 6,
} as const;

interface iEvent {
    type: (typeof eEventType)[keyof typeof eEventType];
}

interface iEvent_A extends iEvent {
    type: typeof eEventType.a;
}

interface iEvent_B extends iEvent {
    type: typeof eEventType.b;
}

const transitions = {
    [eStateType.a]: {
        [eEventType.a]: function (initialState: iState_A, event: iEvent_A): iState_B {
            return { type: eStateType.b };
        },
    },
    [eStateType.b]: {
        [eEventType.a]: function (initialState: iState_B, event: iEvent_A): iState_A {
            return { type: eStateType.a };
        },
        [eEventType.b]: function (initialState: iState_B, event: iEvent_B): iState_B {
            return { type: eStateType.b };
        },
    },
} as const;

type TTT = typeof transitions;

type SSS1 = __PossibleEventTypes<TTT, typeof eStateType.a>;
type SSS2 = __PossibleEventTypes<TTT, typeof eStateType.b>;
type SSS3 = __PossibleEventTypes<TTT, typeof eStateType.c>;
// type SSS4 = __PossibleEventTypes<TTT, number>;

const stateMachine = new StateMachine<
    UnionToTuple<(typeof eStateType)[keyof typeof eStateType]>,
    UnionToTuple<(typeof eEventType)[keyof typeof eEventType]>,
    typeof transitions
>(transitions);

const finalState0 = stateMachine.transition({ type: eStateType.a }, { type: eEventType.a });

// @ts-expect-error
const finalState1 = stateMachine.transition({ type: eStateType.a }, { type: eEventType.b });
const finalState2 = stateMachine.transition({ type: eStateType.b }, { type: eEventType.a });
const finalState3 = stateMachine.transition({ type: eStateType.b }, { type: eEventType.b });

// @ts-expect-error
const finalState4 = stateMachine.transition({ type: eStateType.c }, { type: eEventType.a });
// @ts-expect-error
const finalState5 = stateMachine.transition({ type: eStateType.c }, { type: eEventType.b });

export { UnionToTuple, StateMachine };

*/