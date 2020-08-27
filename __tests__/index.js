const plugin = require("../index");
const { transformSync } = require("@babel/core");

function trim(str) {
  return str.replace(/\s+/g, ' ').trim()
}

describe("cherry-picked modular builds", function () {
  it(`Should work`, () => {
    const expected = 
      `
        import Shadow from "drei/lib/Shadow";
        import Box from "drei/lib/Box";
        import Test from "react-three-fiber";
      `;

    const actual = transformSync(
      `
        import { Shadow, Box } from "drei/macro"
        import Test from "react-three-fiber"
      `,
      {
        plugins: [[plugin]],
      }
    ).code;

    expect(trim(actual)).toBe(trim(expected));
  });

  it(`Should work with renamed imports`, () => {
    const expected = `import Foo from "drei/lib/Box";`;

    const actual = transformSync(
      `import { Box as Foo } from "drei/macro"`,
      {
        plugins: [[plugin]],
      }
    ).code;

    expect(trim(actual)).toBe(trim(expected));
  });
});
