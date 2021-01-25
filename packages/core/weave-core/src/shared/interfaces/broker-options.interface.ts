import { BulkheadOptions } from "../types/bulkhead-options.type";
import { CacheOptions } from "../types/cache-options.type";
import { CircuitBreakerOptions } from "../types/circuit-breaker-options.type";
import { LoggerOptions } from "../types/logger-options.type";
import { MetricsOptions } from "../types/metrics-options.type";
import { RegistryOptions } from "../types/registry-options.type";
import { RetryPolicyOptions } from "../types/retry-policy-options.type";
import { TracingOptions } from "../types/tracing-options.type";
import { TransportOptions } from "../types/transport-options.type";
import { Broker } from "./broker.interface";
import { Middleware } from "./middleware.interface";

export interface BrokerOptions {
  nodeId?: string,
  bulkhead: BulkheadOptions,
  cache: CacheOptions,
  circuitBreaker: CircuitBreakerOptions,
  transport: TransportOptions,
  errorHandler?: Function,
  loadNodeService: boolean,
  publishNodeService: boolean,
  loadInternalMiddlewares: boolean,
  metrics: MetricsOptions,
  middlewares?: Array<Middleware>,
  logger?: LoggerOptions,
  tracing: TracingOptions,
  namespace?: String,
  registry?: RegistryOptions,
  retryPolicy: RetryPolicyOptions,
  validateActionParams?: boolean,
  watchServices?: boolean,
  waitForServiceInterval?: number,
  beforeRegisterMiddlewares?: () => string,
  uuidFactory?: () => string,
  started?: (this: Broker) => void,
  stopped?: (this: Broker) => void
}