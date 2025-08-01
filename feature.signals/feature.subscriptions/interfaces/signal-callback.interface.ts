/**
 * A function that handles signal activations by receiving the emitted payload.
 *
 * This is one of the two supported subscriber forms in the signal system.
 * It is typically passed directly to {@link SubscribableSignal.subscribe}.
 *
 * @template T - The type of the payload passed when the signal is activated.
 *
 * @example
 * const callback: ISignalCallback<number> = (value) => {
 *   console.log("Signal received with:", value)
 * }
 */
export interface ISignalCallback<T> {
    (detail: T): void
}
