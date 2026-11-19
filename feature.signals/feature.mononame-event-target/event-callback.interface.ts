import type { DetailEvent } from "./detail-event.interface.ts"

/**
 * A function that handles an event dispatched by {@link MononameEventTarget}.
 *
 * @remarks
 * This is the functional form of an event listener, directly compatible with `addEventListener`.
 * It receives the dispatched event; only its `detail` payload is part of the contract (see {@link DetailEvent}).
 *
 * @template T - The type of the `detail` payload carried by the event.
 *
 * @internal
 */
export interface EventCallback<T> {
    (event: DetailEvent<T>): void
}
