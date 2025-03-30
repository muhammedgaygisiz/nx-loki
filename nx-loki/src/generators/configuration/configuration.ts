import { formatFiles, generateFiles, Tree } from "@nx/devkit";
import * as path from "path";
import { ConfigurationGeneratorSchema } from "./schema";

export async function configurationGenerator(
  tree: Tree,
  options: ConfigurationGeneratorSchema
) {
  const projectRoot = `apps/${options.name}`;

  generateFiles(tree, path.join(__dirname, "files"), projectRoot, { tmpl: "" });

  await formatFiles(tree);
}

export default configurationGenerator;
