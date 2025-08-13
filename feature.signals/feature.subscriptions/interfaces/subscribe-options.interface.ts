import { SubscribableSignal } from "../subscribable-signal.class.ts"

/**
 * Options for configuring a signal subscription.
 *
 * This interface extends the standard `AddEventListenerOptions` to allow fine-grained control
 * over signal listener behavior. It is used as the second parameter in {@link SubscribableSignal.subscribe}.
 *
 * @example
 * // Remove after first call
 * signal.subscribe(handler, { once: true })
 *
 * // Unsubscribe manually using AbortSignal
 * const controller = new AbortController()
 * signal.subscribe(fn, { signal: controller.signal })
 * controller.abort()
 */
export interface ISubscribeOptions extends AddEventListenerOptions {
    /** If `true`, the subscriber will be removed automatically after the first activation. */
    once?: boolean

    /** If `true`, the subscriber is considered passive and will not cancel signal behavior. */
    passive?: boolean

    /** An `AbortSignal` that can be used to cancel the subscription externally. */
    signal?: AbortSignal

    /** Reserved for compatibility with event APIs. Ignored in signal behavior. */
    capture?: boolean
}
