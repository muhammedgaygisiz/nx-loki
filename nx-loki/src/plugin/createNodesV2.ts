import { readFileSync } from "fs";
import {
  CreateNodesContextV2,
  createNodesFromFiles,
  CreateNodesV2,
} from "nx/src/project-graph/plugins";
import { dirname, resolve } from "path";
import { TargetConfiguration } from "nx/src/config/workspace-json-project-json";

/* eslint-disable-next-line */
interface LokiPluginOptions {}

const lokiConfigGlob = "**/loki.config.js";

const createNodesInternal = (
  configFilePath: string,
  options: LokiPluginOptions,
  context: CreateNodesContextV2
) => {
  const projectRoot = dirname(configFilePath);

  const lokiConfigContent = readFileSync(
    resolve(context.workspaceRoot, configFilePath)
  ).toString();

  const testTarget: TargetConfiguration = {
    command: `loki test`,
    options: { cwd: projectRoot },
    cache: false,
    inputs: [
      "{projectRoot}/loki.config.js",
      {
        externalDependencies: ["loki"],
      },
    ],
    outputs: [`{projectRoot}/$outDir`],
  };

  return {
    projects: {
      [projectRoot]: {
        targets: {
          ["test-loki"]: testTarget,
          ["test-update"]: testTarget,
          ["test-approve"]: testTarget,
        },
      },
    },
  };
};

const crateNodesResultFunction = (configFile, options, context) =>
  createNodesInternal(configFile, options, context);

const createNodesFunction = async (configFiles, options, context) =>
  await createNodesFromFiles(
    crateNodesResultFunction,
    configFiles,
    options,
    context
  );

export const createNodesV2: CreateNodesV2<LokiPluginOptions> = [
  lokiConfigGlob,
  createNodesFunction,
];

export default createNodesV2;
