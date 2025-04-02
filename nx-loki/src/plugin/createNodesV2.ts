import { readFileSync } from "fs";
import {
  CreateNodesContextV2,
  createNodesFromFiles,
  CreateNodesV2,
} from "nx/src/project-graph/plugins";
import { dirname, resolve } from "path";
import { TargetConfiguration } from "nx/src/config/workspace-json-project-json";
import {
  isStorybookPlugin,
  pleaseInstallNxStorybookPlugin,
} from "../utils/plugins.utils";

/* eslint-disable-next-line */
interface LokiPluginOptions {}

const lokiConfigGlob = "**/loki.config.js";

const getBuildStorybookOutput = (projectRoot: string) => `./storybook-static`;

const createNodesInternal = (
  configFilePath: string,
  options: LokiPluginOptions,
  context: CreateNodesContextV2
) => {
  const hasStorybookPlugin = context.nxJsonConfiguration.plugins.some(
    (plugin) => isStorybookPlugin(plugin)
  );

  if (!hasStorybookPlugin) {
    throw pleaseInstallNxStorybookPlugin();
  }

  const projectRoot = dirname(configFilePath);

  const resolvedConfigFile = resolve(context.workspaceRoot, configFilePath);

  const lokiConfigContent = readFileSync(resolvedConfigFile).toString();

  const buildStorybookOutput = getBuildStorybookOutput(projectRoot);
  const updateTarget: TargetConfiguration = {
    command: `loki update --reactUri file:${buildStorybookOutput}`,
    options: {
      cwd: projectRoot,
    },
    cache: false,
    inputs: [
      "{projectRoot}/loki.config.js",
      {
        externalDependencies: ["loki"],
      },
    ],
    dependsOn: ["build-storybook"],
  };

  const approveTarget: TargetConfiguration = {
    command: `loki approve --reactUri file:${buildStorybookOutput}`,
    options: {
      cwd: projectRoot,
    },
    cache: false,
    inputs: [
      "{projectRoot}/loki.config.js",
      {
        externalDependencies: ["loki"],
      },
    ],
    dependsOn: ["build-storybook"],
  };

  const testTarget: TargetConfiguration = {
    command: `loki test --reactUri file:${buildStorybookOutput}`,
    options: {
      cwd: projectRoot,
    },
    cache: false,
    inputs: [
      "{projectRoot}/loki.config.js",
      {
        externalDependencies: ["loki"],
      },
    ],
    dependsOn: ["build-storybook"],
  };

  return {
    projects: {
      [projectRoot]: {
        targets: {
          ["update-loki"]: updateTarget,
          ["test-loki"]: testTarget,
          ["approve-loki"]: approveTarget,
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
