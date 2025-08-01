/**
 * An object-based listener that handles a `CustomEvent<T>` via a method call.
 *
 * This is the object-oriented form of an event listener compatible with `addEventListener`.
 * Useful when the handler needs to maintain internal state or encapsulate context.
 *
 * @template T - The type of the `detail` payload carried by the event.
 */
export interface EventHandler<T> {
    /**
     * Handles the dispatched event.
     *
     * @param event - The `CustomEvent<T>` emitted from the dispatcher.
     */
    handleEvent(object: CustomEvent<T>): void
}
