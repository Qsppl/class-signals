/**
 * Describes an object that can be externally activated with an optional payload.
 *
 * The `IActivable<T>` interface represents any component that exposes a simple activation mechanism.
 * This can be used in reactive architectures, side-effect systems, task queues, or other mechanisms
 * where controlled triggering is required.
 *
 * Implementations of this interface provide an `activate()` method to initiate or dispatch behavior,
 * often delivering a value of type `T` to internal systems or observers.
 *
 * @template T - The type of the payload passed during activation.
 */
export interface IActivable<T> {
    /**
     * Activates the object, optionally passing a value to the underlying logic or listeners.
     *
     * The semantics of activation depend on the context:
     * - In reactive systems, it may notify subscribers.
     * - In action pipelines, it may queue or trigger effects.
     *
     * @param detail - Optional data delivered during activation.
     */
    activate(detail?: T): void
}
