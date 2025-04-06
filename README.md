# nx-loki

`nx-loki` is an Nx plugin for integrating [Loki](https://github.com/oblador/loki), a visual regression testing tool for Storybook, into your Nx workspace. This plugin helps you set up and run visual regression tests to ensure that your UI components remain consistent over time.

## Installation

To add the `nx-loki` plugin to your Nx workspace, run the following command:

```sh
nx add nx-loki
```

This command will modify your `package.json` to add Loki as a development dependency and include `nx-loki` in the list of plugins in your `nx.json`.

## Configuration

To configure `nx-loki` for a specific project in your workspace, use the following command:

```sh
nx g nx-loki:configuration <project-name>
```

This command will add the necessary configuration files and settings to your project to enable Loki for visual regression testing.

## Usage

### Running Visual Regression Tests

To run visual regression tests with Loki, use the following command:

```sh
npx nx run <project-name>:loki
```

This command will execute the visual regression tests for the specified project.

### Updating Baseline Images

If you need to update the baseline images for your visual regression tests, use the following command:

```sh
npx nx run <project-name>:loki-update
```

This command will update the baseline images with the current state of your UI components.

### Approving Changes

To approve changes detected by Loki, use the following command:

```sh
npx nx run <project-name>:loki-approve
```

This command will approve the changes and update the baseline images accordingly.

## Additional Resources

For more information about Loki and its configuration options, refer to the [Loki documentation](https://github.com/oblador/loki).

For more information about Nx and its capabilities, refer to the [Nx documentation](https://nx.dev).

## Useful Links

- [Nx Documentation](https://nx.dev)
- [Loki Documentation](https://github.com/oblador/loki)
- [Nx Plugin Registry](https://nx.dev/plugin-registry)
- [Nx Community](https://go.nx.dev/community)
