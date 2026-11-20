/** @param {typeof import("class-signals")} lib */
export function runScenario(lib) {
    const { Signal, ProtectedSignal, ProtectedSignalController } = lib
    for (const [name, value] of Object.entries({ Signal, ProtectedSignal, ProtectedSignalController })) {
        if (typeof value !== "function") throw new Error(`export ${name} is ${typeof value}, expected a class`)
    }

    const log = []
    const signal = new Signal()
    const callback = (value) => log.push(`callback:${value}`)
    signal.subscribe(callback)
    signal.subscribe({ handleSignal: (value) => log.push(`handler:${value}`) })
    signal.subscribe((value) => log.push(`once:${value}`), { once: true })
    const abort = new AbortController()
    signal.subscribe((value) => log.push(`aborted:${value}`), { signal: abort.signal })

    signal.activate(1)
    signal.unsubscribe(callback)
    abort.abort()
    signal.activate(2)

    const controller = new ProtectedSignalController()
    const exposed = controller.signal
    if (!(exposed instanceof ProtectedSignal)) throw new Error("controller.signal is not a ProtectedSignal")
    if ("activate" in exposed) throw new Error("ProtectedSignal exposes activate()")
    exposed.subscribe((value) => log.push(`protected:${value}`))
    controller.activate(3)

    const expected = ["callback:1", "handler:1", "once:1", "aborted:1", "handler:2", "protected:3"].join(" ")
    if (log.join(" ") !== expected) throw new Error(`unexpected calls:\n  got      ${log.join(" ")}\n  expected ${expected}`)
}
