import type { SubscribableSignal } from "../subscribable-signal.class.ts"
import type { ISubscribeOptions } from "./subscribe-options.interface.ts"

/**
 * Options for configuring signal unsubscription behavior.
 *
 * This interface is used as the second parameter in {@link SubscribableSignal.unsubscribe}
 * to ensure the correct listener is removed when multiple options were involved during subscription.
 *
 * While most signals can be unsubscribed without options, specifying `capture` is
 * supported for compatibility with systems that rely on precise option matching.
 *
 * @remarks
 * Mirrors the DOM `EventListenerOptions` interface field by field: the options are passed
 * as-is to the underlying `EventTarget.removeEventListener`. It does not `extend` the DOM
 * interface so that the published typings stay independent of `lib.dom.d.ts`, in line with
 * {@link ISubscribeOptions}. Being structurally identical, an `EventListenerOptions` object
 * can be passed wherever `IUnsubscribeOptions` is expected, and vice versa.
 *
 * @see {@link https://dom.spec.whatwg.org/#dictdef-eventlisteneroptions | DOM Standard: EventListenerOptions}
 *
 * @example
 * signal.unsubscribe(handler, { capture: true })
 */
export interface IUnsubscribeOptions {
    /** Optional flag used to match the listener registered with `capture: true`. */
    capture?: boolean
}
