declare module 'ioredis' {
  import { EventEmitter } from 'events';

  interface RedisOptions {
    port?: number;
    host?: string;
    // Add other options as needed
  }

  class Redis extends EventEmitter {
    constructor(port: number, host: string, options?: RedisOptions);
    constructor(host: string, options?: RedisOptions);
    constructor(options: RedisOptions);
    constructor(url: string);

    connect(): Promise<void>;
    disconnect(): void;
    
    set(key: string, value: string): Promise<string>;
    get(key: string): Promise<string | null>;
    // Add other Redis methods as needed
  }

  export = Redis;
}