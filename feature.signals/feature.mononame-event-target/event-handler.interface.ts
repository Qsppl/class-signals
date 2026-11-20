import type { DetailEvent } from "./detail-event.interface.ts"

/**
 * An object-based listener that handles an event dispatched by {@link MononameEventTarget} via a method call.
 *
 * @remarks
 * This is the object-oriented form of an event listener compatible with `addEventListener`.
 * Useful when the handler needs to maintain internal state or encapsulate context.
 *
 * @template T - The type of the `detail` payload carried by the event.
 *
 * @internal
 */
export interface EventHandler<T> {
    /**
     * Handles the dispatched event.
     *
     * @param event - The event emitted from the dispatcher; only its `detail` payload is part of the contract.
     */
    handleEvent(event: DetailEvent<T>): void
}
