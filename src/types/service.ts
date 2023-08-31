export interface CommonService<T> {
  create: <P extends Omit<T, "status" | "id">>(payload: P) => Promise<T>;
  delete: (id: number) => Promise<T>;
  update: <P extends Omit<T, "id" | "status">>(
    id: number,
    payload: P
  ) => Promise<T>;
  get: (id: number) => Promise<T>;
  getAll: () => Promise<T[]>;
}
