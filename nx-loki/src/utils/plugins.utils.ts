import { PluginConfiguration } from "@nx/devkit";

export const pleaseInstallNxStorybookPlugin = (): string => `
    Storybook is not installed for the application.
`;

export const isLokiPlugin = (plugin: PluginConfiguration) =>
  typeof plugin === "string"
    ? plugin === "nx-loki"
    : plugin.plugin === "nx-loki";

export const isStorybookPlugin = (plugin: PluginConfiguration) =>
  typeof plugin === "string"
    ? plugin === "@nx/storybook/plugin"
    : plugin.plugin === "@nx/storybook/plugin";
