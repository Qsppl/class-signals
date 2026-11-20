/**
 * The subset of `CustomEventInit<T>` accepted by {@link MononameEventTarget.dispatchEvent}.
 *
 * @remarks
 * Declared structurally so that the published typings do not depend on `lib.dom.d.ts`.
 * A real `CustomEventInit<T>` satisfies this interface.
 *
 * @template T - The type of the `detail` payload carried by the event.
 *
 * @internal
 */
export interface DispatchInit<T> {
    detail?: T | undefined
    cancelable?: boolean
}
