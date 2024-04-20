import lumeCMS, { GitHub } from "lume/cms.ts";
import { Octokit } from "npm:octokit";
import "@std/dotenv/load";

const githubOpts = {
  owner: "kuboon",
  repo: "lume-template",
  path: "src",
  branch: "cms",
  client: new Octokit({
    auth: Deno.env.get("GITHUB_TOKEN"), // A personal access token,
  })
};

const cms = lumeCMS();

cms.storage("gh", new GitHub(githubOpts));

cms.document("Site info", "src:_data.yml", [
  "description: text",
  {
    name: "metas",
    type: "object",
    fields: [
      "site: text",
      "lang: text",
      "twitter: text"
    ]
  },
]);

const postFields = [
  "draft: checkbox",
  "title: text",
  "content: markdown",
]
cms.collection("Posts local", "src:posts/*.md", postFields)
cms.collection("Posts", "gh:posts/*.md", postFields)

export default cms;
