import type { EventCallback } from "../feature.mononame-event-target/event-callback.interface.ts"
import { MononameEventTarget } from "../feature.mononame-event-target/mononame-event-target.class.ts"
import { createListener } from "./create-listener.helper.ts"
import type { ISubscribeOptions } from "./interfaces/subscribe-options.interface.ts"
import type { IUnsubscribeOptions } from "./interfaces/unsubscribe-options.interface.ts"
import type { Subscriber } from "./subscriber.type.ts"

/**
 * Abstract base class for objects that allow subscribers to be notified of events or changes.
 *
 * `SubscribableSignal<T>` defines a mechanism for attaching and detaching listeners
 * that respond to activations. It supports both function-style and object-style subscribers
 * and internally manages conversion to low-level event callbacks.
 *
 * This class serves as the foundation for reactive patterns where certain entities expose
 * observable behavior, but do not necessarily define how or when activation occurs.
 *
 * Typically used as a base for reactive primitives that require controlled subscription logic.
 *
 * @template T - The type of data passed to subscribers upon activation.
 */
export abstract class SubscribableSignal<T> {
    /** Internal event target used to dispatch and manage the signal's event listeners. */
    #eventTarget = new MononameEventTarget<T>()

    /** Cache for subscriber-to-callback wrappers to ensure consistent reference on removal. */
    #subscriberToListener = new WeakMap<Subscriber<any>, EventCallback<any>>()

    /**
     * @param eventTarget - The event dispatcher responsible for handling listener invocation.
     *
     * This constructor is meant for use by subclasses only.
     */
    constructor(eventTarget: MononameEventTarget<T>) {
        this.#eventTarget = eventTarget
    }

    /**
     * Registers a subscriber to receive notifications when the signal is activated.
     *
     * The subscriber can be:
     * - a function: `(payload: T) => void`
     * - an object: `{ handleSignal(payload: T): void }`
     *
     * @param subscriber - The callback or handler object to register.
     * @param options - Optional options such as `once`, `signal`, etc.
     */
    subscribe(subscriber: Subscriber<T>, options?: ISubscribeOptions): void {
        const eventListener = this.#subscriberToListener.get(subscriber) ?? createListener(subscriber)
        this.#subscriberToListener.set(subscriber, eventListener)
        this.#eventTarget.addEventListener(eventListener, options)
    }

    /**
     * Unregisters a previously subscribed listener.
     *
     * The given subscriber must be the same reference that was passed to {@link subscribe}.
     *
     * @param subscriber - The function or object to unsubscribe.
     * @param options - Optional options matching those passed during subscription.
     */
    unsubscribe(subscriber: Subscriber<T>, options?: IUnsubscribeOptions): void {
        const eventListener = this.#subscriberToListener.get(subscriber)
        if (eventListener !== undefined) this.#eventTarget.removeEventListener(eventListener, options)
    }
}
