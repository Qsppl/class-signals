import { EventCallback } from "../feature.mononame-event-target/event-callback.interface.js"
import { Subscriber } from "./subscriber.type.js"

/**
 * Wraps a {@link Subscriber} into a standard event callback compatible with {@link EventTarget}.
 *
 * This function is used internally to convert high-level subscribers (function or object)
 * into low-level event listeners that can be passed to `addEventListener`.
 *
 * - If the subscriber is a function, it will receive the `detail` payload directly.
 * - If it's an object, it must implement `handleSignal(detail: T)`.
 *
 * The returned function extracts the `.detail` from the `CustomEvent<T>` and
 * forwards it to the subscriber.
 *
 * @param subscriber - A function or object that handles signal payloads.
 * @returns An `EventListener` function compatible with `addEventListener`.
 *
 * @internal
 */
export function createListener<T>(subscriber: Subscriber<T>): EventCallback<T> {
    if (typeof subscriber === "function") return (event) => subscriber(event.detail)
    return (event) => subscriber.handleSignal(event.detail)
}
