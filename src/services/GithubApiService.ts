import axios from "axios";
import { z } from "zod";

export class GithubApiService {

    private static githubAccount = "roberto-ng";

    static async fetchPublicRepos(): Promise<Array<GithubRepo>> {
        const res = await axios.get("https://api.github.com/repositories");

        // validar resposta
        const data = githubRepositoriesResponseSchema.parse(res.data);
        return data;
    }

    static async fetchMyRepos(): Promise<Array<GithubRepo>> {
        const url = `https://api.github.com/users/${GithubApiService.githubAccount}/repos`;
        const res = await axios.get(url);
        
        // validar resposta 
        const data = githubRepositoriesResponseSchema.parse(res.data);
        return data;
    }

    static async fetchRepoDetails(owner: string, repoName: string): Promise<GithubRepoDetails> {
        const res = await axios.get(`https://api.github.com/repos/${owner}/${repoName}`);

        // validar resposta
        const data = githubRepoDetailsSchema.parse(res.data);
        return data;
    }

    static async fetchContributors(owner: string, repoName: string): Promise<Array<GithubContributor>> {
        const res = await axios.get(`https://api.github.com/repos/${owner}/${repoName}/contributors`);
        const data = githubContributorsResponseSchema.parse(res.data);
        return data;
    }

    static async queryRepos(name: string): Promise<Array<GithubRepo>> {
        const query = `?q=${encodeURIComponent(name)}`;
        const url = "https://api.github.com/search/repositories" + query;
        console.log({url})
        const res = await axios.get(url);
        const data = githubQueryResultSchema.parse(res.data);
        return data.items;
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
    owner: githubRepoOwnerSchema,
});

export type GithubRepoDetails = z.infer<typeof githubRepoDetailsSchema>;
export const githubRepoDetailsSchema = z.object({
    id: z.number(),
    node_id: z.string(),
    name: z.string(),
    full_name: z.string(),
    html_url: z.string(),
    description: z.string().nullish(),
    languages_url: z.string(),
    updated_at: z.string(),
    created_at: z.string(),	
    language: z.string(),
    owner: githubRepoOwnerSchema,
});

export const githubRepositoriesResponseSchema = z.array(githubRepoSchema);

export const githubQueryResultSchema = z.object({
    items: z.array(githubRepoSchema),
});

export type GithubContributor = z.infer<typeof githubContributorSchema>;
export const githubContributorSchema = z.object({
    html_url: z.string(),
    login: z.string(),
    id: z.number(),
    avatar_url: z.string(),
});

export const githubContributorsResponseSchema = z.array(githubContributorSchema);