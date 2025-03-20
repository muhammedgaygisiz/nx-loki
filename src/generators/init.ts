import {
  ExpandedPluginConfiguration,
  formatFiles,
  NxJsonConfiguration,
  readNxJson,
  Tree,
  updateNxJson,
} from "@nx/devkit";
import { InitGeneratorSchema } from "./schema";

const isPlugin = (plugin: string | ExpandedPluginConfiguration<unknown>) =>
  typeof plugin === "string"
    ? plugin === "nx-loki"
    : plugin.plugin === "nx-loki";

const nxLokiPlugin = {
  plugin: "nx-loki",
  options: {},
};

const attachNxLokiPlugin = (nxJson: NxJsonConfiguration<"*" | string[]>) => [
  ...nxJson.plugins,
  nxLokiPlugin,
];

export async function initGenerator(tree: Tree, options: InitGeneratorSchema) {
  const nxJson = readNxJson(tree) || {};
  const hasPlugin = nxJson.plugins?.some((plugin) => isPlugin(plugin));

  if (!hasPlugin) {
    if (!nxJson.plugins) {
      nxJson.plugins = [];
    }

    nxJson.plugins = attachNxLokiPlugin(nxJson);

    updateNxJson(tree, nxJson);
    await formatFiles(tree);
  }
}

export default initGenerator;
