import axios from "axios";
import { z } from "zod";

export class GithubApiService {

    static async fetchPublicRepos(): Promise<Array<GithubRepo>> {
        const res = await axios.get("https://api.github.com/repositories");
        const data = githubRepositoriesResponseSchema.parse(res.data);
        return data;
    }

}

export type GithubRepoOwner = z.infer<typeof githubRepoOwnerSchema>;
export const githubRepoOwnerSchema = z.object({
    login: z.string(),
    avatar_url: z.string(),
    html_url: z.string(),
})

export type GithubRepo = z.infer<typeof githubRepoSchema>;
export const githubRepoSchema = z.object({
    id: z.number(),
    node_id: z.string(),
    name: z.string(),
    full_name: z.string(),
    html_url: z.string(),
    description: z.string().nullish(),
    languages_url: z.string(),
    owner: githubRepoOwnerSchema,
});

export const githubRepositoriesResponseSchema = z.array(githubRepoSchema);

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}