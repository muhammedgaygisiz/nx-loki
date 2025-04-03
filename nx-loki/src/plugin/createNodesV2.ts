import { createNodesFromFiles, CreateNodesV2 } from "@nx/devkit";
import { lokiConfigGlob } from "../utils/plugins.utils";
import { createNodesInternal } from "./create-nodes-internal";
import { LokiPluginOptions } from "./loki-plugin-options";

const createNodesFunction = async (configFiles, options, context) =>
  await createNodesFromFiles(
    createNodesInternal,
    configFiles,
    options,
    context
  );

export const createNodesV2: CreateNodesV2<LokiPluginOptions> = [
  lokiConfigGlob,
  createNodesFunction,
];

export default createNodesV2;
