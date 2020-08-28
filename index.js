const types = require("@babel/types");

module.exports = function () {
  return {
    visitor: {
      ImportDeclaration: function (path, state) {
        // https://github.com/babel/babel/tree/master/packages/babel-types#timportdeclarationspecifiers-source

        // path.node has properties 'source' and 'specifiers' attached.
        // path.node.source is the library/module name, aka 'drei'.
        // path.node.specifiers is an array of ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier
        const source = path.node.source.value;
        const transforms = [];

        const memberImports = path.node.specifiers.filter(function (specifier) {
          return specifier.type === "ImportSpecifier";
        });

        memberImports.forEach(function (memberImport) {
          // Examples of member imports:
          //      import { member } from 'module'; (ImportSpecifier)
          //      import { member as alias } from 'module' (ImportSpecifier)

          // transform this:
          //      import { Grid as gird } from 'drei';
          // into this:
          //      import Grid from 'drei/lib/Grid';
          const importName = `drei/dist/${memberImport.imported.name}`;

          if (source === "drei/macro") {

            transforms.push(
              types.importDeclaration(
                [
                  types.importDefaultSpecifier(
                    types.identifier(memberImport.local.name)
                  ),
                ],
                types.stringLiteral(importName)
              )
            );

          }

          
        });

        if (transforms.length > 0) {
          path.replaceWithMultiple(transforms);
        }
      },
    },
  };
};
