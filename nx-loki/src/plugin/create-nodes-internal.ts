import { CreateNodesContextV2, logger, TargetConfiguration } from "@nx/devkit";
import { dirname } from "path/posix";
import {
  isStorybookPlugin,
  pleaseInstallNxStorybookPlugin,
  getBuildStorybookOutput,
} from "../utils/plugins.utils";
import { LokiPluginOptions } from "./loki-plugin-options";
import { buildTestParams } from "./build-test-params";
import { buildReactUriParser } from "./build-react-uri-param";

export const createNodesInternal = (
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

  const reactUriParams = buildReactUriParser(buildStorybookOutput);

  const updateTarget: TargetConfiguration = {
    command: `loki update ${reactUriParams}`,
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
    command: `loki approve ${reactUriParams}`,
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

  const testParams = buildTestParams(options, buildStorybookOutput);
  const testTarget: TargetConfiguration = {
    command: `loki test ${testParams}`,
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
