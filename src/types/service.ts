export interface CommonService<T> {
  create: <P extends Omit<T, "status" | "id" | "parentId">>(
    payload: P
  ) => Promise<Omit<T, "status">>;
  delete: (id: number) => Promise<T>;
  update: <P extends Partial<Omit<T, "id" | "status">>>(
    id: number,
    payload: P
  ) => Promise<Omit<T, "status">>;
  get: (id: number) => Promise<Omit<T, "status">>;
  getAll: () => Promise<Omit<T, "status">[]>;
}
