export interface CommonService<T> {
  create: <P extends Omit<T, "status" | "id">>(
    payload: P
  ) => Promise<Omit<T, "status">>;
  delete: (id: number) => Promise<T>;
  update: <P extends Omit<T, "id" | "status">>(
    id: number,
    payload: P
  ) => Promise<Omit<T, "status">>;
  get: (id: number) => Promise<Omit<T, "status">>;
  getAll: () => Promise<Omit<T, "status">[]>;
}
