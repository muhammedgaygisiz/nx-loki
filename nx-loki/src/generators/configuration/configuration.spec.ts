import { createTreeWithEmptyWorkspace } from "@nx/devkit/testing";
import { Tree, readProjectConfiguration } from "@nx/devkit";

import { configurationGenerator } from "./configuration";
import { ConfigurationGeneratorSchema } from "./schema";

describe("configuration generator", () => {
  let tree: Tree;
  const options: ConfigurationGeneratorSchema = { name: "test" };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it("should run successfully", async () => {
    await configurationGenerator(tree, options);

    const LOKI_CONFIG_FILE = `apps/${options.name}/loki.config.js`;
    expect(tree.exists(LOKI_CONFIG_FILE)).toBeTruthy();

    const PROJECT_PACKAGE_JSON = `apps/${options.name}/package.json`;
    expect(tree.exists(PROJECT_PACKAGE_JSON)).toBeTruthy();

    const lokiConfigFile = tree.read(LOKI_CONFIG_FILE, "utf-8");
    expect(lokiConfigFile).toMatchSnapshot();

    const packageJsonFile = JSON.parse(
      tree.read(PROJECT_PACKAGE_JSON, "utf-8")
    );
    expect(packageJsonFile).toMatchSnapshot();
  });
});
