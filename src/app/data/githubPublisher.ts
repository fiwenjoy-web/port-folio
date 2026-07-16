const GITHUB_API = "https://api.github.com";
const OWNER = "fiwenjoy-web";
const REPO = "port-folio";
const BRANCH = "main";
const MANIFEST_PATH = "public/portfolio/manifest.json";
const CONTENT_PATH = "public/content/site-content.json";

export const GITHUB_TOKEN_SESSION_KEY = "wh_github_publish_token";

export type PublishedImages = Record<number, string[]>;

type GitHubResponse = Record<string, unknown>;

async function githubRequest(path: string, token: string, init: RequestInit = {}) {
  const response = await fetch(`${GITHUB_API}${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...init.headers,
    },
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({})) as { message?: string };
    throw new Error(payload.message || `GitHub request failed (${response.status})`);
  }

  return response.json() as Promise<GitHubResponse>;
}

export async function validateGithubToken(token: string) {
  if (!token.trim()) throw new Error("GitHub token is required");
  const repository = await githubRequest(`/repos/${OWNER}/${REPO}`, token);
  const permissions = repository.permissions as { push?: boolean } | undefined;
  if (!permissions?.push) {
    throw new Error(`Token needs Contents: Read and write access to ${OWNER}/${REPO}`);
  }
  return true;
}

async function commitFiles({
  token,
  message,
  entries,
}: {
  token: string;
  message: string;
  entries: Array<{ path: string; content: string; encoding: "base64" | "utf-8" }>;
}) {
  await validateGithubToken(token);
  const ref = await githubRequest(`/repos/${OWNER}/${REPO}/git/ref/heads/${BRANCH}`, token);
  const parentSha = (ref.object as { sha?: string } | undefined)?.sha;
  if (!parentSha) throw new Error("Unable to read the main branch");
  const parentCommit = await githubRequest(`/repos/${OWNER}/${REPO}/git/commits/${parentSha}`, token);
  const baseTreeSha = (parentCommit.tree as { sha?: string } | undefined)?.sha;
  if (!baseTreeSha) throw new Error("Unable to read the repository tree");

  const treeEntries: Array<{ path: string; mode: string; type: string; sha: string }> = [];
  for (const entry of entries) {
    const blob = await githubRequest(`/repos/${OWNER}/${REPO}/git/blobs`, token, {
      method: "POST",
      body: JSON.stringify({ content: entry.content, encoding: entry.encoding }),
    });
    const sha = String(blob.sha || "");
    if (!sha) throw new Error(`Unable to upload ${entry.path}`);
    treeEntries.push({ path: entry.path, mode: "100644", type: "blob", sha });
  }

  const tree = await githubRequest(`/repos/${OWNER}/${REPO}/git/trees`, token, {
    method: "POST",
    body: JSON.stringify({ base_tree: baseTreeSha, tree: treeEntries }),
  });
  if (!tree.sha) throw new Error("Unable to create the commit tree");
  const commit = await githubRequest(`/repos/${OWNER}/${REPO}/git/commits`, token, {
    method: "POST",
    body: JSON.stringify({ message, tree: tree.sha, parents: [parentSha] }),
  });
  if (!commit.sha) throw new Error("Unable to create the commit");
  await githubRequest(`/repos/${OWNER}/${REPO}/git/refs/heads/${BRANCH}`, token, {
    method: "PATCH",
    body: JSON.stringify({ sha: commit.sha, force: false }),
  });
}

export async function publishSiteContent(token: string, content: unknown) {
  await commitFiles({
    token,
    message: "Publish portfolio content",
    entries: [{ path: CONTENT_PATH, content: `${JSON.stringify(content, null, 2)}\n`, encoding: "utf-8" }],
  });
}

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error(`Unable to read ${file.name}`));
    reader.onload = () => {
      const result = String(reader.result);
      resolve(result.slice(result.indexOf(",") + 1));
    };
    reader.readAsDataURL(file);
  });
}

function safeFilename(filename: string) {
  const dot = filename.lastIndexOf(".");
  const extension = dot >= 0 ? filename.slice(dot).toLowerCase() : ".jpg";
  const name = (dot >= 0 ? filename.slice(0, dot) : filename)
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase() || "image";
  return `${name}${extension}`;
}

function normalizeManifest(value: unknown): PublishedImages {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(
    Object.entries(value)
      .map(([key, images]) => [Number(key), Array.isArray(images) ? images.filter((image): image is string => typeof image === "string") : []])
      .filter(([key, images]) => Number.isInteger(key) && key > 0 && images.length > 0),
  );
}

export async function loadPublishedImages(): Promise<PublishedImages> {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}portfolio/manifest.json?ts=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) return {};
    return normalizeManifest(await response.json());
  } catch {
    return {};
  }
}

export async function publishProjectImages({
  token,
  projectId,
  files,
  currentImages,
  manifest,
}: {
  token: string;
  projectId: number;
  files: File[];
  currentImages: string[];
  manifest: PublishedImages;
}) {
  if (!token.trim()) throw new Error("GitHub token is required");
  if (!files.length) return manifest;

  const ref = await githubRequest(`/repos/${OWNER}/${REPO}/git/ref/heads/${BRANCH}`, token);
  const parentSha = (ref.object as { sha?: string } | undefined)?.sha;
  if (!parentSha) throw new Error("Unable to read the main branch");

  const parentCommit = await githubRequest(`/repos/${OWNER}/${REPO}/git/commits/${parentSha}`, token);
  const baseTreeSha = (parentCommit.tree as { sha?: string } | undefined)?.sha;
  if (!baseTreeSha) throw new Error("Unable to read the repository tree");

  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const treeEntries: Array<{ path: string; mode: string; type: string; sha: string }> = [];
  const publishedPaths: string[] = [];

  for (const [index, file] of files.entries()) {
    const content = await fileToBase64(file);
    const blob = await githubRequest(`/repos/${OWNER}/${REPO}/git/blobs`, token, {
      method: "POST",
      body: JSON.stringify({ content, encoding: "base64" }),
    });
    const blobSha = String(blob.sha || "");
    if (!blobSha) throw new Error(`Unable to upload ${file.name}`);
    const path = `portfolio/project-${projectId}/${stamp}-${index + 1}-${safeFilename(file.name)}`;
    publishedPaths.push(path);
    treeEntries.push({ path: `public/${path}`, mode: "100644", type: "blob", sha: blobSha });
  }

  const nextManifest: PublishedImages = {
    ...manifest,
    [projectId]: [...currentImages, ...publishedPaths],
  };
  const manifestBlob = await githubRequest(`/repos/${OWNER}/${REPO}/git/blobs`, token, {
    method: "POST",
    body: JSON.stringify({ content: JSON.stringify(nextManifest, null, 2) + "\n", encoding: "utf-8" }),
  });
  const manifestSha = String(manifestBlob.sha || "");
  if (!manifestSha) throw new Error("Unable to update the image manifest");
  treeEntries.push({ path: MANIFEST_PATH, mode: "100644", type: "blob", sha: manifestSha });

  const tree = await githubRequest(`/repos/${OWNER}/${REPO}/git/trees`, token, {
    method: "POST",
    body: JSON.stringify({ base_tree: baseTreeSha, tree: treeEntries }),
  });
  if (!tree.sha) throw new Error("Unable to create the portfolio commit tree");
  const commit = await githubRequest(`/repos/${OWNER}/${REPO}/git/commits`, token, {
    method: "POST",
    body: JSON.stringify({
      message: `Publish ${files.length} portfolio image${files.length === 1 ? "" : "s"} for project ${projectId}`,
      tree: tree.sha,
      parents: [parentSha],
    }),
  });
  if (!commit.sha) throw new Error("Unable to create the portfolio commit");
  await githubRequest(`/repos/${OWNER}/${REPO}/git/refs/heads/${BRANCH}`, token, {
    method: "PATCH",
    body: JSON.stringify({ sha: commit.sha, force: false }),
  });

  return nextManifest;
}
