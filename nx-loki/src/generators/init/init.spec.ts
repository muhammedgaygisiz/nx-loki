import { createTreeWithEmptyWorkspace } from "@nx/devkit/testing";
import { readNxJson, Tree } from "@nx/devkit";

import { initGenerator } from "./init";
import { InitGeneratorSchema } from "./schema";

describe("init generator", () => {
  let tree: Tree;
  const options: InitGeneratorSchema = {};

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it("should run successfully", async () => {
    await initGenerator(tree, options);

    const nxJson = readNxJson(tree);
    expect(nxJson.plugins).toMatchSnapshot();

    const modifiedPackageJson = JSON.parse(tree.read("package.json", "utf-8"));

    expect(modifiedPackageJson).toMatchSnapshot();
  });
});
