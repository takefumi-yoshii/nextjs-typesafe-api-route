import { mapPathParamFromQuery } from "./mapPathParamFromQuery";
// ____________________________________________________________
//
describe("utils/mapPathParamFromQuery", () => {
  describe("PathParam のない PATH文字列の場合", () => {
    const PATH = "/path/to/page";
    test("Query を付与しない場合、PATH文字列 がそのまま返却される", () => {
      expect(mapPathParamFromQuery(PATH)).toBe(PATH);
    });
    test("Query を付与した場合、QueryParam が付与される", () => {
      expect(mapPathParamFromQuery(PATH, { id: "1" })).toBe(`${PATH}?id=1`);
    });
  });

  describe("PathParam のある PATH文字列の場合", () => {
    const PATH = "/path/to/[id]";
    test("Query を付与しない場合、例外を投げる", () => {
      expect(() => mapPathParamFromQuery(PATH)).toThrow();
    });
    test("一致する Query が付与されていない場合、例外を投げる", () => {
      expect(() => mapPathParamFromQuery(PATH, { name: "1" })).toThrow();
    });
    test("一致する Query が付与されている場合、PathParam にマッピングされる", () => {
      expect(mapPathParamFromQuery(PATH, { id: "1" })).toBe("/path/to/1");
    });
    test("一致する Query が付与されている場合、PathParam にマッピングされ、QueryParam が付与される", () => {
      expect(mapPathParamFromQuery(PATH, { id: "1", name: "1" })).toBe(
        "/path/to/1?name=1"
      );
    });
  });

  describe("ネストしたPathParam のある PATH文字列の場合", () => {
    const PATH = "/path/to/[id]/nested/[slug]";
    test("Query を付与しない場合、例外を投げる", () => {
      expect(() => mapPathParamFromQuery(PATH)).toThrow();
    });
    test("一致する Query が全て付与されていない場合、例外を投げる", () => {
      expect(() =>
        mapPathParamFromQuery(PATH, { id: "1", q: "query" })
      ).toThrow();
    });
    test("一致する Query が全て付与されている場合、PathParam にマッピングされる", () => {
      expect(mapPathParamFromQuery(PATH, { id: "1", slug: "test" })).toBe(
        "/path/to/1/nested/test"
      );
    });
    test("一致する Query が全て付与されている場合、PathParam にマッピングされ、QueryParam が付与される", () => {
      expect(
        mapPathParamFromQuery(PATH, { id: "1", slug: "test", q: "query" })
      ).toBe("/path/to/1/nested/test?q=query");
    });
    test("一致する Query が全て付与されている場合、PathParam にマッピングされ、QueryParam が付与される", () => {
      expect(
        mapPathParamFromQuery(PATH, {
          id: "1",
          slug: "test",
          q: ["a", "b", "c"],
        })
      ).toBe("/path/to/1/nested/test?q=a&q=b&q=c");
    });
  });
});
