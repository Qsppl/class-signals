/**
 * An object that handles signal activations through a method call.
 *
 * This is one of the two supported subscriber forms in the signal system.
 * It is typically passed to {@link SubscribableSignal.subscribe} and receives
 * the emitted payload via its `handleSignal` method.
 *
 * This form is useful when you need to bind a persistent object instance
 * to signal handling, often with internal state or context.
 *
 * @template T - The type of the payload passed when the signal is activated.
 *
 * @example
 * class Logger implements ISignalHandler<string> {
 *   handleSignal(message: string): void {
 *     console.log("Log:", message)
 *   }
 * }
 *
 * const logger = new Logger()
 * signal.subscribe(logger)
 */
export interface ISignalHandler<T> {
    /**
     * Handles the signal by receiving the payload emitted during activation.
     *
     * This method is called automatically when the signal is triggered.
     *
     * @param detail - The payload provided during signal activation.
     */
    handleSignal(detail: T): void
}
