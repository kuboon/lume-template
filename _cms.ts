import lumeCMS from "lume/cms/mod.ts";
import GitHub from "lume/cms/storage/github.ts";
import { Octokit } from "npm:octokit";

const client = new Octokit({
  auth: Deno.env.get("GITHUB_TOKEN"), // A personal access token,
});

const githubOpts = {
  owner: "kuboon",
  repo: "lume-template",
  path: "src",
  branch: "cms",
  client
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

const postFields: Lume.CMS.Field[] = [
  "draft: checkbox",
  "title: text",
  "content: markdown",
]
cms.collection("Posts local", "src:posts/*.md", postFields)
cms.collection("Posts", "gh:posts/*.md", postFields)

export default cms;
