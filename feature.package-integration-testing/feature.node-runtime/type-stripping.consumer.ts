import * as lib from "class-signals"
import type { Subscriber } from "class-signals"
import { runScenario } from "./consumer.scenario.js"

const subscriber: Subscriber<number> = () => {}
new lib.Signal<number>().subscribe(subscriber)
runScenario(lib)
