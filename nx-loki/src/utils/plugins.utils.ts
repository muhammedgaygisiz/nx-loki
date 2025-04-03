import { PluginConfiguration, readJsonFile } from "@nx/devkit";

export const lokiConfigGlob = "**/loki.config.js";
export const DEFAULT_STORYBOOK_OUTPUT = "./storybook-static";

export const pleaseInstallNxStorybookPlugin = (): { message: string } => ({
  message: `Storybook Plugin is not installed for the application.`,
});

export const isLokiPlugin = (plugin: PluginConfiguration) =>
  typeof plugin === "string"
    ? plugin === "nx-loki"
    : plugin.plugin === "nx-loki";

export const isStorybookPlugin = (plugin: PluginConfiguration) =>
  typeof plugin === "string"
    ? plugin === "@nx/storybook/plugin"
    : plugin.plugin === "@nx/storybook/plugin";

export const getBuildStorybookOutputPath = (
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

export const getProjectsStorybookConfig = (filePath): any | null => {
  const parts = filePath.split("/"); // Split the path by '/'
  if (parts.length >= 2) {
    return readJsonFile(`${parts[0]}/${parts[1]}/project.json`);
  }

  return null; // Return null if the path is invalid
};

export const getBuildStorybookOutput = (configFilePath: string) => {
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
