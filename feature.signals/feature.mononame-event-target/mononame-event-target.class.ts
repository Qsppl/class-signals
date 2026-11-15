import type { EventHandler } from "./event-handler.interface.ts"
import type { EventCallback } from "./event-callback.interface.ts"
import { Signal } from "../signal.class.ts"
import { ProtectedSignal } from "../feature.protected-signal/protected-signal.class.ts"

/**
 * Internal event dispatcher that wraps `EventTarget` for a single fixed event type.
 *
 * `MononameEventTarget<T>` is a simplified wrapper around the native `EventTarget`,
 * designed for internal use within the signal system. It enforces a fixed event name,
 * meaning all added listeners respond to the same implicit signal.
 *
 * This class provides a streamlined event transport layer for signal subscriptions and activations,
 * avoiding the complexity of named events, bubbling, and capture phases.
 *
 * It is used internally by {@link Signal}, {@link ProtectedSignal}, and related reactive components.
 *
 * @template T - The type of the payload carried via `CustomEvent<T>`.
 */
export class MononameEventTarget<T> {
    #internalEventTarget = new EventTarget()

    #eventType

    /**
     *
     * @param label optional event name for debug
     */
    constructor(label: string = "") {
        this.#eventType = label
    }

    /**
     * Adds a listener that will be triggered when a custom event is dispatched.
     *
     * @param callback - A function or object that handles the dispatched event.
     * @param options - Optional listener options such as `once`, `signal`, etc.
     */
    public addEventListener(callback: EventCallback<T> | EventHandler<T>, options?: AddEventListenerOptions): void {
        /// @ts-expect-error typing of CustomEvent not implemented by standart in dom.lib.d.ts
        this.#internalEventTarget.addEventListener(this.#eventType, callback, options)
    }

    /**
     * Dispatches a `CustomEvent<T>` to all registered listeners.
     *
     * @param eventInitDict - Optional event configuration including `detail` payload.
     * @returns `true` if the event was not cancelled (always true for non-cancelable).
     */
    public dispatchEvent(eventInitDict?: CustomEventInit<T> | undefined): boolean {
        return this.#internalEventTarget.dispatchEvent(new CustomEvent(this.#eventType, eventInitDict))
    }

    /**
     * Removes a previously registered listener.
     *
     * @param callback - The same function or object originally passed to `addEventListener`.
     * @param options - Optional removal options matching those used during subscription.
     */
    public removeEventListener(callback: EventCallback<T> | EventHandler<T>, options?: EventListenerOptions): void {
        /// @ts-expect-error typing of CustomEvent not implemented by standart in dom.lib.d.ts
        this.#internalEventTarget.removeEventListener(this.#eventType, callback, options)
    }
}
