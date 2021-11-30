declare module "@/types/pages/api" {
  export interface Data<T> {
    data: T;
  }
  export interface Error {
    error: {
      httpStatus: number;
      message: string;
    };
  }
}
