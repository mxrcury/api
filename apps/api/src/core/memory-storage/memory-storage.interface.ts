type Key = string | number

export abstract class Storage {
    abstract get<T>(key: Key): T;
    abstract set<T>(key: Key, value: T): void;
    abstract del(key: Key): boolean;
    abstract update<T>(key: Key, value: T): boolean

    abstract get storage(): Map<string | number, unknown>
}