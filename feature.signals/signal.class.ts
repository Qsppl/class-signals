import type { IActivable } from "./activable.interface.ts"
import { MononameEventTarget } from "./feature.mononame-event-target/mononame-event-target.class.ts"
import type { ISubscribeOptions } from "./feature.subscriptions/interfaces/subscribe-options.interface.ts"
import type { IUnsubscribeOptions } from "./feature.subscriptions/interfaces/unsubscribe-options.interface.ts"
import { SubscribableSignal } from "./feature.subscriptions/subscribable-signal.class.ts"
import type { Subscriber } from "./feature.subscriptions/subscriber.type.ts"

/**
 * A fully reactive signal that allows both emitting and observing events.
 *
 * `Signal<T>` is a reactive primitive designed for class-based architectures.
 * It allows internal or external code to both **subscribe to events** and **trigger them** directly via {@link activate}.
 *
 * Subscribers can be either:
 * - functions receiving the payload directly, or
 * - objects with a `handleSignal(payload: T)` method.
 *
 * This makes it ideal for implementing simple observable state, reactive messaging, or event-driven communication.
 *
 * @template T - The type of the payload passed to subscribers when the signal is activated.
 *
 * @example
 * class Counter {
 *   public readonly onChange = new Signal<number>()
 *
 *   increment() {
 *     this.onChange.activate(this.value++)
 *   }
 * }
 *
 * const counter = new Counter()
 * counter.onChange.subscribe(value => {
 *   console.log("Counter changed to:", value)
 * })
 */
export class Signal<T = never> extends SubscribableSignal<T> implements IActivable<T> {
    /** Internal event target used to dispatch and manage the signal's event listeners. */
    #eventTarget = new MononameEventTarget<T>()

    constructor() {
        const eventTarget = new MononameEventTarget<T>()
        super(eventTarget)
        this.#eventTarget = eventTarget
    }

    /**
     * Activates the signal, notifying all current subscribers.
     *
     * This method delivers the given `detail` payload to all registered subscribers.
     * Subscribed functions receive the payload directly; subscribed objects receive it via `handleSignal(payload)`.
     *
     * This is the primary way to broadcast reactive updates in a signal-based architecture.
     *
     * @param detail - Optional data to pass to each subscriber. If omitted, `undefined` is delivered.
     *
     * @example
     * const signal = new Signal<string>()
     * signal.subscribe(name => console.log("Name changed:", name))
     * signal.activate("Alice")
     *
     * @example
     * class Logger {
     *   handleSignal(msg: string) {
     *     console.log("Logged:", msg)
     *   }
     * }
     * const logger = new Logger()
     * signal.subscribe(logger)
     * signal.activate("Updated")
     */
    activate(detail?: T): void {
        this.#eventTarget.dispatchEvent({ detail, cancelable: false })
    }

    /**
     * Subscribes to the signal, so the provided callback will be invoked whenever the signal is activated.
     *
     * The subscriber can be either:
     * - a function that receives the signal's payload, or
     * - an object implementing `{ handleSignal(detail: T): void }`
     *
     * This method supports standard listener options like `{ once: true }` or `{ signal: AbortSignal }`
     * for controlling the subscription lifecycle.
     *
     * @param subscriber - Function or object to be notified on signal activation.
     * @param options - Optional listener options, such as `once` or `signal` for aborting.
     *
     * @example
     * signal.subscribe(value => console.log("Signal received:", value))
     *
     * @example
     * signal.subscribe({ handleSignal: value => console.log("Handled:", value) })
     *
     * @example
     * const controller = new AbortController()
     * signal.subscribe(fn, { signal: controller.signal })
     * controller.abort() // automatically removes the listener
     */
    subscribe(subscriber: Subscriber<T>, options?: ISubscribeOptions): void {
        super.subscribe(subscriber, options)
    }

    /**
     * Unsubscribes a previously registered subscriber from the signal.
     *
     * The given subscriber must be the **same function or object** that was passed to {@link subscribe}.
     * This ensures the callback will no longer be triggered by future signal activations.
     *
     * This method is functionally equivalent to using an `AbortSignal` when subscribing,
     * but allows for explicit manual unsubscription.
     *
     * @param subscriber - The function or object previously passed to `subscribe`.
     * @param options - (Optional) Listener options matching those used during subscription.
     *
     * @example
     * const callback = (value: number) => console.log(value)
     * signal.subscribe(callback)
     * signal.unsubscribe(callback)
     *
     * @example
     * const handler = { handleSignal: (x: string) => { ... } }
     * signal.subscribe(handler)
     * signal.unsubscribe(handler)
     *
     * @example
     * // Alternative: use AbortSignal
     * const controller = new AbortController()
     * signal.subscribe(fn, { signal: controller.signal })
     * controller.abort()
     */
    unsubscribe(subscriber: Subscriber<T>, options?: IUnsubscribeOptions): void {
        super.unsubscribe(subscriber, options)
    }
}
