/**
 * Options for configuring signal unsubscription behavior.
 *
 * This interface is used as the second parameter in {@link SubscribableSignal.unsubscribe}
 * to ensure the correct listener is removed when multiple options were involved during subscription.
 *
 * While most signals can be unsubscribed without options, specifying `capture` is
 * supported for compatibility with systems that rely on precise option matching.
 *
 * @example
 * signal.unsubscribe(handler, { capture: true })
 */
export interface IUnsubscribeOptions extends EventListenerOptions {
    /** Optional flag used to match the listener registered with `capture: true`. */
    capture?: boolean
}
