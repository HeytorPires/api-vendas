export interface ICacheProvider {
  save(key: string, value: any, ttl?: number): Promise<void>;
  recover<T>(key: string): Promise<T | null>;
  invalidate(key: string): Promise<void>;
  //   invalidatePrefix(prefix: string): Promise<void>;
}
