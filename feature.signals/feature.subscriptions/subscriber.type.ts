import type { ISignalHandler } from "./interfaces/signal-handler.interface.ts"
import type { ISignalCallback } from "./interfaces/signal-callback.interface.ts"

/**
 * A union type representing any valid subscriber to a signal.
 *
 * A subscriber can be either:
 * - a function that receives the signal payload: {@link ISignalCallback}
 * - an object with a `handleSignal` method: {@link ISignalHandler}
 *
 * This type is used in the `subscribe` and `unsubscribe` methods
 * of signal-related classes to accept both forms of subscription.
 *
 * @template T - The type of the payload passed to the subscriber when the signal is activated.
 *
 * @example
 * const fnSubscriber: Subscriber<number> = (value) => {
 *   console.log("Got:", value)
 * }
 *
 * const objSubscriber: Subscriber<string> = {
 *   handleSignal: (text) => console.log("Handled:", text)
 * }
 */
export type Subscriber<T> = ISignalCallback<T> | ISignalHandler<T>
