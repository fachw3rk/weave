export interface Span {
    name: string;
    id: string;
    traceId: string;
    parentId: string;
    type: string;
    sampled: boolean;
    finishTime?: number;
    duration?: number;
    error?: Error;
    service: any;
    tags?: any;
    startTime?: number;
    addTags(tags: any): Span;
    start(time?: number): Span;
    startChildSpan(name: string, options: any): Span;
    finish(time: number): Span;
    isActive(): boolean;
    setError(error: Error): any;
}
