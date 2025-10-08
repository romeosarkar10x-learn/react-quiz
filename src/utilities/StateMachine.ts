// ============================================================================
// Type Utilities
// ============================================================================

type UnionToTupleT<T extends number> = (
    (T extends unknown ? (t: T) => T : never) extends infer U
        ? (U extends unknown ? (u: U) => unknown : never) extends (v: infer V) => unknown
            ? V
            : never
        : never
) extends (_: unknown) => infer W
    ? [...UnionToTupleT<Exclude<T, W>>, W]
    : [];

type ValueOfT<T extends object> = T[keyof T];

// ============================================================================
// State Machine Types
// ============================================================================

interface State<T extends Record<string, number>> {
    sType: T[keyof T];
}

interface StateN<T extends number> {
    sType: T;
}

interface Event<T extends Record<string, number>> {
    eType: T[keyof T];
}

interface EventN<T extends number> {
    eType: T;
}

type TransitionMapT<
    UnionEnumStateType extends number,
    UnionStateType extends StateN<UnionEnumStateType>,
    UnionEnumEventType extends number,
    UnionEventType extends EventN<UnionEnumEventType>,
> = {
    [S in UnionEnumStateType]?: {
        [E in UnionEnumEventType]?: (
            state: MatchStateT<UnionEnumStateType, UnionStateType, S>,
            event: MatchEventT<UnionEnumEventType, UnionEventType, E>,
        ) => UnionStateType;
    };
};

type MatchStateT<
    UnionEnumStateType extends number,
    UnionStateType extends StateN<UnionEnumStateType>,
    EnumStateType,
> = UnionStateType extends { sType: EnumStateType } ? UnionStateType : never;

type MatchEventT<
    UnionEnumEventType extends number,
    UnionEventType extends EventN<UnionEnumEventType>,
    EnumEventType,
> = UnionEventType extends { eType: EnumEventType } ? UnionEventType : never;

type PossibleEventT<TransitionMapType extends Record<number, unknown>, StateType extends number> =
    ValueOfT<{
        [K in keyof TransitionMapType as K extends StateType ? K : never]: TransitionMapType[K];
    }> extends infer T
        ? T extends never
            ? never
            : keyof T
        : never;

type FinalStateT<
    UnionEnumStateType extends number,
    UnionStateType extends StateN<UnionEnumStateType>,
    UnionEnumEventType extends number,
    UnionEventType extends EventN<UnionEnumEventType>,
    TransitionMapType extends TransitionMapT<UnionEnumStateType, UnionStateType, UnionEnumEventType, UnionEventType>,
    StateType extends number,
    EventType extends number,
> = ValueOfT<{
    [K in keyof TransitionMapType as K extends StateType ? K : never]: ValueOfT<{
        [L in keyof TransitionMapType[K] as L extends EventType ? L : never]: TransitionMapType[K][L];
    }> extends (
        initialState: MatchStateT<UnionEnumStateType, UnionStateType, StateType>,
        event: MatchEventT<UnionEnumEventType, UnionEventType, EventType>,
    ) => infer ReturnType
        ? ReturnType
        : never;
}>;

// ============================================================================
// State Machine Class
// ============================================================================

class StateMachine<
    UnionEnumStateObjType extends Record<string, number>,
    UnionStateType extends State<UnionEnumStateObjType>,
    UnionEnumEventObjType extends Record<string, number>,
    UnionEventType extends Event<UnionEnumEventObjType>,
    TransitionMapType extends TransitionMapT<
        ValueOfT<UnionEnumStateObjType>,
        UnionStateType,
        ValueOfT<UnionEnumEventObjType>,
        UnionEventType
    >,
> {
    transitions: TransitionMapType;

    constructor(transitions: TransitionMapType) {
        this.transitions = transitions;
    }

    transition<
        StateType extends { sType: Extract<keyof TransitionMapType, number> },
        EventType extends { eType: PossibleEventT<TransitionMapType, StateType["sType"]> },
    >(
        state: StateType,
        event: EventType,
    ): FinalStateT<
        ValueOfT<UnionEnumStateObjType>,
        UnionStateType,
        ValueOfT<UnionEnumEventObjType>,
        UnionEventType,
        TransitionMapType,
        StateType["sType"],
        EventType["eType"]
    > {
        const stateTransitions = this.transitions[state.sType];
        const transitionFn = (stateTransitions as Exclude<typeof stateTransitions, undefined>)[
            event.eType
        ] as unknown as (
            state: StateType,
            event: EventType,
        ) => FinalStateT<
            ValueOfT<UnionEnumStateObjType>,
            UnionStateType,
            ValueOfT<UnionEnumEventObjType>,
            UnionEventType,
            TransitionMapType,
            StateType["sType"],
            EventType["eType"]
        >;

        return (transitionFn as Exclude<typeof transitionFn, undefined>)(state, event);
    }
}

export type { Event, State, UnionToTupleT };
export { StateMachine };
