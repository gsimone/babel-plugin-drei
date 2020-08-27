const plugin = require("../index");
const { transformSync } = require("@babel/core");

function trim(str) {
  return str.replace(/\s+/g, ' ').trim()
}

describe("cherry-picked modular builds", function () {
  it(`Should work`, () => {
    const expected = 
      `
        import Shadow from "drei/dist/Shadow";
        import Box from "drei/dist/Box";
        import { Bloom } from 'react-postprocessing';
        import Test from "react-three-fiber";
      `;

    const actual = transformSync(
      `
        import { Shadow, Box } from "drei/macro"
        import { Bloom } from 'react-postprocessing'
        import Test from "react-three-fiber"
      `,
      {
        plugins: [[plugin]],
      }
    ).code;

    expect(trim(actual)).toBe(trim(expected));
  });

  it(`Should work with renamed imports`, () => {
    const expected = `import Foo from "drei/dist/Box";`;

    const actual = transformSync(
      `import { Box as Foo } from "drei/macro"`,
      {
        plugins: [[plugin]],
      }
    ).code;

    expect(trim(actual)).toBe(trim(expected));
  });
});
