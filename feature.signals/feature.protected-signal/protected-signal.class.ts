import type { ISubscribeOptions } from "../feature.subscriptions/interfaces/subscribe-options.interface.ts"
import type { IUnsubscribeOptions } from "../feature.subscriptions/interfaces/unsubscribe-options.interface.ts"
import { SubscribableSignal } from "../feature.subscriptions/subscribable-signal.class.ts"
import type { Subscriber } from "../feature.subscriptions/subscriber.type.ts"

/**
 * A read-only reactive signal for observing internal events without triggering them.
 *
 * `ProtectedSignal<T>` allows external code to **subscribe to changes** without having access to activation.
 * It is typically used to expose internal reactivity safely from within a class.
 *
 * Subscribers can be either:
 * - functions receiving the payload directly, or
 * - objects with a `handleSignal(payload: T)` method.
 *
 * This class is most commonly paired with a {@link ProtectedSignalController}, which retains control
 * over when the signal is activated.
 *
 * This separation of concerns makes `ProtectedSignal<T>` ideal for encapsulated reactive architectures,
 * where internal logic emits updates, and external code merely observes them.
 *
 * @template T - The type of the payload passed to subscribers when the signal is activated.
 *
 * @example
 * class Counter {
 *   #onChangeController = new ProtectedSignalController<number>()
 *   public readonly onChange = this.#onChangeController.signal
 *
 *   increment() {
 *     this.#onChangeController.activate(this.value++)
 *   }
 * }
 *
 * const counter = new Counter()
 * counter.onChange.subscribe(value => {
 *   console.log("Counter changed to:", value)
 * })
 */
export class ProtectedSignal<T> extends SubscribableSignal<T> {
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
     * This class does not allow signal activation. Use {@link ProtectedSignalController}
     * to manage signal triggering internally.
     *
     * @param subscriber - Function or object to be notified on signal activation.
     * @param options - Optional listener options, such as `once` or `signal` for aborting.
     *
     * @example
     * protectedSignal.subscribe(value => console.log("Received:", value))
     *
     * @example
     * const handler = { handleSignal: msg => console.log("Handled:", msg) }
     * protectedSignal.subscribe(handler)
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
     * You can also use `AbortSignal` during subscription for automatic cancellation.
     *
     * @param subscriber - The function or object previously passed to `subscribe`.
     * @param options - (Optional) Listener options matching those used during subscription.
     *
     * @example
     * const callback = (value: number) => console.log(value)
     * protectedSignal.subscribe(callback)
     * protectedSignal.unsubscribe(callback)
     */
    unsubscribe(subscriber: Subscriber<T>, options?: IUnsubscribeOptions): void {
        super.unsubscribe(subscriber, options)
    }
}
