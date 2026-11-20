import type { SubscribableSignal } from "../subscribable-signal.class.ts"

/**
 * Options for configuring a signal subscription.
 *
 * Used as the second parameter in {@link SubscribableSignal.subscribe}.
 *
 * @remarks
 * Mirrors the DOM `AddEventListenerOptions` interface (which itself extends `EventListenerOptions`)
 * field by field: the options are passed as-is to the underlying `EventTarget.addEventListener`.
 * It does not `extend` the DOM interface on purpose: `AddEventListenerOptions` is not declared
 * globally by `@types/node`, so inheriting from it would break Node.js consumers compiling
 * without `lib.dom.d.ts`. Being structurally identical, an `AddEventListenerOptions` object
 * can be passed wherever `ISubscribeOptions` is expected, and vice versa.
 *
 * @see {@link https://dom.spec.whatwg.org/#dictdef-addeventlisteneroptions | DOM Standard: AddEventListenerOptions}
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
export interface ISubscribeOptions {
    /** If `true`, the subscriber will be removed automatically after the first activation. */
    once?: boolean

    /** If `true`, the subscriber is considered passive and will not cancel signal behavior. */
    passive?: boolean

    /** An `AbortSignal` that can be used to cancel the subscription externally. */
    signal?: AbortSignal

    /** Reserved for compatibility with event APIs. Ignored in signal behavior. */
    capture?: boolean
}
