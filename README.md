[![npm version](https://img.shields.io/npm/v/class-signals.svg?style=flat&logo=npm&label=class-signals)](https://www.npmjs.com/package/class-signals)
[![license](https://img.shields.io/npm/l/class-signals?style=flat)](https://github.com/Qsppl/class-signals/blob/main/LICENSE)

# 🎯 class-signals

> Reactive signaling for class-based TypeScript — safe, simple, and expressive.

A small, focused library for creating and managing reactive signals in object-oriented JavaScript and TypeScript.

Use it to **broadcast changes**, **listen to internal events**, and **expose read-only observables** — all with strong typing and no boilerplate.

---

## 📦 Install

```bash
npm install class-signals
```

The package ships compiled ES modules with type declarations and source maps, so it works as-is in Node.js (`import` and `require()`), Deno, Bun, bundlers such as Vite and webpack, and directly in the browser.

---

## ⚡ Quick Example

```ts
import { Signal } from "class-signals"

const onMessage = new Signal<string>()

onMessage.subscribe((text) => {
    console.log("📩 Message received:", text)
})

onMessage.activate("Hello, world!")
```

> ✅ For safe, read-only signal exposure, use `ProtectedSignal` + `ProtectedSignalController`

---

## 🧠 Public API

### 🔔 `Signal<T>`

A reactive signal that allows both **subscribing** and **activating** updates.
Great for local event buses, live data updates, or observable service events.

```ts
const signal = new Signal<number>()
signal.subscribe((v) => console.log("Received:", v))
signal.activate(42)
```

- `subscribe(fn, options?)`
- `unsubscribe(fn, options?)`
- `activate(payload)`

---

### 🔒 `ProtectedSignal<T>`

A **read-only** signal: lets others subscribe, but only you can activate it.
Designed for safe reactive encapsulation.

```ts
class Store {
    #events = new ProtectedSignalController<string>()
    public readonly onChange = this.#events.signal

    update() {
        this.#events.activate("updated")
    }
}
```

- `subscribe(fn, options?)`
- `unsubscribe(fn, options?)`

---

### 🛠️ `ProtectedSignalController<T>`

Holds the power to **trigger** a protected signal.
Perfect for internal logic, paired with a `ProtectedSignal` for external safety.

```ts
const controller = new ProtectedSignalController<number>()
controller.signal.subscribe((v) => console.log(v))
controller.activate(1)
```

- `activate(payload)`
- `signal` — the exposed read-only `ProtectedSignal<T>`

---

## 💡 Recommended Patterns

### ✅ Expose only what’s needed

```ts
class AuthService {
    #changed = new ProtectedSignalController<void>()
    public readonly onChange = this.#changed.signal

    login() {
        this.#changed.activate()
    }
}
```

### ✂️ Auto-unsubscribe with AbortSignal

```ts
const controller = new AbortController()
signal.subscribe(fn, { signal: controller.signal })
controller.abort()
```

### 1️⃣ One-time subscription

```ts
signal.subscribe(fn, { once: true })
```

### 🧱 Object-based subscribers

```ts
signal.subscribe({
    handleSignal(value) {
        console.log("Handled:", value)
    },
})
```

---

## 🤔 Why not EventTarget / EventEmitter?

- No event names to manage (`"change"`, `"data"` — gone!)
- Fully typed payloads
- Easy read-only APIs
- `AbortSignal` and `once` built-in
- Focused: no bubbling, no DOM quirks, no legacy cruft

---

🧩 Use `Signal` when you need control.
🔒 Use `ProtectedSignal` to expose safe subscriptions.
⚙️ Use `ProtectedSignalController` to manage internal dispatch.

> That’s it. Clean signals for class-based codebases.
