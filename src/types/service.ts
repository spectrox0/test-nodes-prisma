export interface CommonService<T> {
  create: <P extends Omit<T, "status" | "id">>(payload: P) => Promise<T>;
  delete: () => Promise<T>;
  update: () => Promise<T>;
  get: (id: string) => Promise<T>;
  getAll: () => Promise<T[]>;
}
