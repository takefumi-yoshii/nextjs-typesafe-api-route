import { factory } from "typescript";
// ______________________________________________________
//
// OUTPUT:
// interface Pages {}
//
const interfacePlaceholders = ["Pages"];
export const createInterfacePlaceholders = () =>
  interfacePlaceholders.map((identifier) =>
    factory.createInterfaceDeclaration(
      undefined,
      undefined,
      factory.createIdentifier(identifier),
      undefined,
      undefined,
      []
    )
  );
