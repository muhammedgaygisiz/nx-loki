import {
  addDependenciesToPackageJson,
  formatFiles,
  NxJsonConfiguration,
  readNxJson,
  Tree,
  updateNxJson,
} from "@nx/devkit";
import { InitGeneratorSchema } from "./schema";
import { LOKI_VERSION } from "../../utils/versions";
import { isLokiPlugin } from "../../utils/plugins.utils";

const nxLokiPlugin = {
  plugin: "nx-loki",
  options: {},
};

const attachNxLokiPlugin = (nxJson: NxJsonConfiguration<"*" | string[]>) => [
  ...nxJson.plugins,
  nxLokiPlugin,
];

const updateNxJsonWithPlugin = async (
  nxJson: NxJsonConfiguration<"*" | string[]>,
  tree: Tree
) => {
  if (!nxJson.plugins) {
    nxJson.plugins = [];
  }

  nxJson.plugins = attachNxLokiPlugin(nxJson);

  updateNxJson(tree, nxJson);
  await formatFiles(tree);
};

const addDependency = async (tree: Tree) => {
  return addDependenciesToPackageJson(
    tree,
    {},
    {
      loki: LOKI_VERSION,
    }
  );
};

export async function initGenerator(tree: Tree, options: InitGeneratorSchema) {
  const nxJson = readNxJson(tree) || {};
  const hasPlugin = nxJson.plugins?.some((plugin) => isLokiPlugin(plugin));

  if (!hasPlugin) {
    await updateNxJsonWithPlugin(nxJson, tree);
  }

  await addDependency(tree);
}

export default initGenerator;
