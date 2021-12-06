declare module "@/types/pages" {
  export type PageQuery<T extends string> = {
    [k in T]?: string | string[] | undefined;
  };
}

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
