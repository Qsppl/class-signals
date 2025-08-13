import { ProtectedSignal } from "./protected-signal.class.ts"
import { MononameEventTarget } from "../feature.mononame-event-target/mononame-event-target.class.ts"
import { IActivable } from "../activable.interface.ts"

/**
 * A controller for activating a protected signal, while exposing only a read-only interface to subscribers.
 *
 * `ProtectedSignalController<T>` is a reactive utility that enables controlled signal activation.
 * It internally manages a {@link ProtectedSignal} and exposes it via the {@link signal} getter.
 * This ensures that external consumers can only observe the signal, while internal code retains activation rights.
 *
 * Use this class when you want to **encapsulate reactive behavior** while preventing external triggering.
 *
 * This makes it ideal for implementing models, view models, or services where internal state changes
 * should be observable but not directly mutable from outside.
 *
 * @template T - The type of the payload passed to subscribers when the signal is activated.
 *
 * @example
 * class Counter {
 *   #change = new ProtectedSignalController<number>()
 *   public readonly onChange = this.#change.signal
 *
 *   increment() {
 *     this.#change.activate(this.value++)
 *   }
 * }
 */
export class ProtectedSignalController<T = never> implements IActivable<T> {
    /**
     * Internal event target used to dispatch and manage the signal's event listeners.
     *
     * This event target is shared between the controller and the exposed {@link ProtectedSignal}.
     * It ensures that activations affect only listeners registered to the same logical signal.
     *
     * @internal
     */
    #eventTarget = new MononameEventTarget<T>()

    /**
     * Internal signal instance bound to the same event target.
     *
     * This is the read-only interface exposed to subscribers.
     * External code receives only this signal object, with no access to activation logic.
     *
     * @internal
     */
    #signal = new ProtectedSignal<T>(this.#eventTarget)

    /**
     * Returns the public signal associated with this controller.
     *
     * The returned object supports `subscribe()` and `unsubscribe()`, but does not expose
     * any way to activate the signal.
     */
    get signal() {
        return this.#signal
    }

    /**
     * Activates the protected signal associated with this controller.
     *
     * This method triggers all subscribers of the paired {@link ProtectedSignal}, delivering
     * the given payload to each one.
     *
     * It is typically used within internal logic to notify external listeners of changes,
     * while preventing external code from invoking signal activation directly.
     *
     * @param detail - Optional data to pass to subscribers. If omitted, `undefined` is delivered.
     *
     * @example
     * class Store {
     *   #change = new ProtectedSignalController<number>()
     *   public readonly onChange = this.#change.signal
     *
     *   update(value: number) {
     *     this.#change.activate(value)
     *   }
     * }
     */
    activate(detail?: T): boolean {
        return this.#eventTarget.dispatchEvent({ detail, cancelable: false })
    }
}
