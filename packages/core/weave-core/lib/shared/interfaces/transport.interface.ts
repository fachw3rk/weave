import { Broker } from "./broker.interface";
import { Context } from "./context.interface";
import { Logger } from "./logger.interface";

export interface Transport {
    broker: Broker,
    log: Logger,
    isConnected: Boolean,
    isReady: Boolean,
    pending: PendingStore,
    resolveConnect: Function,
    adapterName: string,
    connect(): Promise<any>,
    disconnect(): Promise<any>,
    setReady(): void,
    send(message: TransportMessage): Promise<any>,
    sendNodeInfo(sender?: string): any,
    sendPing(nodeId: string): Promise<any>,
    discoverNode(target: string): Promise<any>,
    discoverNodes(): Promise<any>,
    sendEvent(context: Context): Promise<any>
    sendBroadcastEvent(nodeId: string, eventName: string, data: Object, groups: Array<string>): Promise<any>,
    removePendingRequestsById(requestId: string): void,
    removePendingRequestsByNodeId(nodeId: string): void,
    createMessage(type: string, targetNodeId?: string, payload?: any): TransportMessage,
    request(context: Context): void,
    response(target: string, contextId: string, data: Object|ReadableStream, meta: Object, error?: WeaveError): Promise<any>,
    statistics: any
}