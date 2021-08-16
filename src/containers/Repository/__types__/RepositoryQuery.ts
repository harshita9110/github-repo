export interface RepositoryNode { 
    name: string| null;
    url: string|null;
    forkCount:number|null; 
    id: string|null;
    openGraphImageUrl: string|null;
    description:string|null;
}

export interface RepositoryEdges { node: RepositoryNode|null }

export interface Repositories { edges: (RepositoryEdges|null)[] }

export interface Organization { repositories: Repositories|null }

export interface OwnerRepositoriesType { organization: Organization|null }

export interface OwnerRepositoryQueryArgument {
    owner:string;
}