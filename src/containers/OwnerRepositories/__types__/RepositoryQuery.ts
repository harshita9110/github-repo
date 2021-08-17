export interface RepositoryNode { 
    name: string| null;
    url: string|null;
    forkCount:number|null; 
    id: string|null;
    description:string|null;
    stargazers: StarGazers|null;
}

export interface StarGazers {
    totalCount:number|null;
}

export interface RepositoryEdges { node: RepositoryNode|null }

export interface Repositories { edges: (RepositoryEdges|null)[] }

export interface Organization { 
    name: string|null;
    location:string|null;
    description:string|null;
    avatarUrl:string|null;
    repositories: Repositories|null;
}

export interface OwnerRepositoriesType { organization: Organization|null }

export interface OwnerRepositoryQueryArgument {
    owner:string;
}