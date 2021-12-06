import { prefetchApiData } from "./swr";
// ____________________________________________________________
//
describe("utils/swr", () => {
  describe("options", () => {
    test("revalidate 間隔を1秒以下にすると例外を投げる", () => {
      expect(() => prefetchApiData("/api/greet", { revalidate: -1 })).toThrow();
    });
  });
});
