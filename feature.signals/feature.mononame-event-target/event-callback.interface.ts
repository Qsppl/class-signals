/**
 * A function that handles a `CustomEvent<T>` dispatched by an {@link EventTarget}.
 *
 * This is the functional form of an event listener, directly compatible with `addEventListener`.
 * It receives the full `CustomEvent<T>` object, including metadata like `type` and `detail`.
 *
 * @template T - The type of the `detail` payload carried by the event.
 */
export interface EventCallback<T> {
    (event: CustomEvent<T>): void
}
