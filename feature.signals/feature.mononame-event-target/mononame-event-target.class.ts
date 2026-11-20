import type { EventHandler } from "./event-handler.interface.ts"
import type { EventCallback } from "./event-callback.interface.ts"
import type { DispatchInit } from "./dispatch-init.interface.ts"
import type { ISubscribeOptions } from "../feature.subscriptions/interfaces/subscribe-options.interface.ts"
import type { IUnsubscribeOptions } from "../feature.subscriptions/interfaces/unsubscribe-options.interface.ts"
import type { Signal } from "../signal.class.ts"
import type { ProtectedSignal } from "../feature.protected-signal/protected-signal.class.ts"

/**
 * Internal event dispatcher that wraps `EventTarget` for a single fixed event type.
 *
 * @remarks
 * A simplified wrapper around the native `EventTarget` that enforces a fixed event name,
 * so all added listeners respond to the same implicit signal. It provides a streamlined
 * event transport layer for signal subscriptions and activations, avoiding the complexity
 * of named events, bubbling, and capture phases.
 *
 * Used by {@link Signal}, {@link ProtectedSignal}, and related reactive components.
 *
 * @template T - The type of the payload carried via `CustomEvent<T>`.
 *
 * @internal
 */
export class MononameEventTarget<T> {
    #internalEventTarget = new EventTarget()

    #eventType

    /**
     * Creates an event target for a single, fixed event type.
     *
     * @param label - Optional event name, used only to tell targets apart while debugging.
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
    public addEventListener(callback: EventCallback<T> | EventHandler<T>, options?: ISubscribeOptions): void {
        /// @ts-expect-error typing of CustomEvent not implemented by standart in dom.lib.d.ts
        this.#internalEventTarget.addEventListener(this.#eventType, callback, options)
    }

    /**
     * Dispatches a `CustomEvent<T>` to all registered listeners.
     *
     * @param eventInitDict - Optional event configuration including `detail` payload.
     * @returns `true` if the event was not cancelled (always true for non-cancelable).
     */
    public dispatchEvent(eventInitDict?: DispatchInit<T>): boolean {
        return this.#internalEventTarget.dispatchEvent(new CustomEvent(this.#eventType, eventInitDict))
    }

    /**
     * Removes a previously registered listener.
     *
     * @param callback - The same function or object originally passed to `addEventListener`.
     * @param options - Optional removal options matching those used during subscription.
     */
    public removeEventListener(callback: EventCallback<T> | EventHandler<T>, options?: IUnsubscribeOptions): void {
        /// @ts-expect-error typing of CustomEvent not implemented by standart in dom.lib.d.ts
        this.#internalEventTarget.removeEventListener(this.#eventType, callback, options)
    }
}
