import { Signal, ProtectedSignal, ProtectedSignalController } from "class-signals"
import type { ISignalCallback, ISignalHandler, ISubscribeOptions, IUnsubscribeOptions, Subscriber } from "class-signals"

const signal = new Signal<number>()
const callback: ISignalCallback<number> = (value) => value.toFixed()
const handler: ISignalHandler<number> = { handleSignal: (value) => value.toFixed() }
const subscribeOptions: ISubscribeOptions = { once: true, signal: new AbortController().signal }
const unsubscribeOptions: IUnsubscribeOptions = { capture: false }
const subscribers: Subscriber<number>[] = [callback, handler]

signal.subscribe(callback, subscribeOptions)
signal.subscribe(handler)
signal.unsubscribe(callback, unsubscribeOptions)
signal.activate(1)
// @ts-expect-error payload type is enforced
signal.activate("1")
// @ts-expect-error subscriber payload type is enforced
signal.subscribe((value: string) => value)

const controller = new ProtectedSignalController<string>()
const exposed: ProtectedSignal<string> = controller.signal
exposed.subscribe((value) => value.toUpperCase())
controller.activate("ok")
// @ts-expect-error a protected signal cannot be activated from outside
exposed.activate("nope")

class Store {
    readonly #changed = new ProtectedSignalController<{ id: number }>()
    readonly changed = this.#changed.signal
    update(id: number) {
        this.#changed.activate({ id })
    }
}
new Store().changed.subscribe(({ id }) => id.toFixed())

export { subscribers }
