const Octokit = require('@octokit/rest');

const token = process.env.GITHUB_TOKEN;
if (!token) {
  throw new Error('Missing GitHub token env in `GITHUB_TOKEN`');
}

const octokit = new Octokit({
  baseUrl: 'https://api.github.com',
  auth: `token ${token}`,
});

const FileInfo = {
  owner: 'pveyes',
  repo: 'scarecrow',
  path: 'scrapelog',
};

async function write(data, sha) {
  return octokit.repos.updateFile({
    ...FileInfo,
    message: 'Update scrape log',
    content: Buffer.from(data).toString("base64"),
    sha,
  });
}

let cache = null;

async function getContent() {
  if (cache === null) {
    const response = await octokit.repos.getContents(FileInfo);
    cache = response.data;
    return cache;
  }

  return cache;
}

async function get() {
  const { content } = await getContent();
  const csv = Buffer.from(content, "base64").toString();
  return csv.split(',').filter(Boolean);
}

async function set(ids) {
  const { sha } = await getContent();
  return write(ids.join(','), sha);
}

module.exports = {
  get,
  set,
}
