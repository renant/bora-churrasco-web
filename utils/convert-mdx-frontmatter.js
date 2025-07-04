const fs = require("fs");
const path = require("path");

const POSTS_PATH = path.join(process.cwd(), "post-contents");

function convertMdxFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");

  // Check if file already has YAML frontmatter
  if (content.startsWith("---")) {
    console.log(
      `Skipping ${path.basename(filePath)} - already has YAML frontmatter`
    );
    return;
  }

  // Extract metadata from JavaScript export
  const metadataMatch = content.match(/export const metadata = ({[\s\S]*?});/);

  if (!metadataMatch) {
    console.log(`No metadata found in ${path.basename(filePath)}`);
    return;
  }

  try {
    // Convert JavaScript object to YAML frontmatter
    const metadataStr = metadataMatch[1];
    const metadata = eval(`(${metadataStr})`);

    // Create YAML frontmatter
    const yamlFrontmatter = `---
title: "${metadata.title}"
resume: "${metadata.resume}"
date: "${metadata.date}"
tags: ${JSON.stringify(metadata.tags)}
coverImage: "${metadata.coverImage}"
slug: "${metadata.slug}"
---

`;

    // Remove the JavaScript export and add YAML frontmatter
    const newContent = content
      .replace(/export const metadata = {[\s\S]*?};/, "")
      .trim();
    const finalContent = yamlFrontmatter + newContent;

    // Write the converted content back to the file
    fs.writeFileSync(filePath, finalContent);
    console.log(`Converted ${path.basename(filePath)}`);
  } catch (error) {
    console.error(`Error converting ${path.basename(filePath)}:`, error);
  }
}

function convertAllMdxFiles() {
  const files = fs.readdirSync(POSTS_PATH);
  const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

  console.log(`Found ${mdxFiles.length} MDX files to convert`);

  mdxFiles.forEach((file) => {
    const filePath = path.join(POSTS_PATH, file);
    convertMdxFile(filePath);
  });

  console.log("Conversion complete!");
}
