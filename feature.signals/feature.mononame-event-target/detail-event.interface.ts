/**
 * The part of a `CustomEvent<T>` the signal system relies on.
 *
 * @remarks
 * Declared structurally instead of referencing `CustomEvent` so that the published typings
 * do not depend on `lib.dom.d.ts`: Node.js consumers compiling without the DOM library
 * can type-check them as well. A real `CustomEvent<T>` satisfies this interface.
 *
 * @template T - The type of the `detail` payload carried by the event.
 *
 * @internal
 */
export interface DetailEvent<T> {
    readonly detail: T
}
