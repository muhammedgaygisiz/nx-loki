import {
  CreateNodesContextV2,
  createNodesFromFiles,
  CreateNodesV2,
  readJsonFile,
} from "@nx/devkit";
import { dirname } from "path";
import { TargetConfiguration } from "nx/src/config/workspace-json-project-json";
import {
  isStorybookPlugin,
  pleaseInstallNxStorybookPlugin,
} from "../utils/plugins.utils";
import { logger } from "@nx/devkit";

/* eslint-disable-next-line */
interface LokiPluginOptions {}

const lokiConfigGlob = "**/loki.config.js";
const DEFAULT_STORYBOOK_OUTPUT = "./storybook-static";

const getBuildStorybookOutputPath = (
  storybookConfigFile: any
): string | null => {
  // Access the build-storybook target options
  const buildStorybookTarget =
    storybookConfigFile?.targets?.["build-storybook"];

  if (buildStorybookTarget && buildStorybookTarget.options?.outputDir) {
    return buildStorybookTarget.options.outputDir;
  }

  // Return null if outputDir is not defined
  return null;
};

const getProjectsStorybookConfig = (filePath): any | null => {
  const parts = filePath.split("/"); // Split the path by '/'
  if (parts.length >= 2) {
    return readJsonFile(`${parts[0]}/${parts[1]}/project.json`);
  }

  return null; // Return null if the path is invalid
};

const getBuildStorybookOutput = (configFilePath: string) => {
  try {
    const storyBookConfigFile = getProjectsStorybookConfig(configFilePath);

    const outputDir = getBuildStorybookOutputPath(storyBookConfigFile);

    if (outputDir) {
      return `../../${outputDir}`;
    }
  } catch (error) {
    console.error("Error reading project.json:", error);
  }

  console.log("Using default build output path for Storybook");
  return DEFAULT_STORYBOOK_OUTPUT;
};

const createNodesInternal = (
  configFilePath: string,
  options: LokiPluginOptions,
  context: CreateNodesContextV2
) => {
  const hasStorybookPlugin = context.nxJsonConfiguration.plugins.some(
    (plugin) => isStorybookPlugin(plugin)
  );

  if (!hasStorybookPlugin) {
    logger.error(
      "Nx Storybook Plugin is not installed. Please install it to use the Loki plugin."
    );
    throw pleaseInstallNxStorybookPlugin();
  }

  const projectRoot = dirname(configFilePath);

  const buildStorybookOutput = getBuildStorybookOutput(configFilePath);

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
