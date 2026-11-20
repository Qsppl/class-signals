const lib = require("class-signals")

import("./consumer.scenario.js").then(({ runScenario }) => runScenario(lib))
