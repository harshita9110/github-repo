export interface Author {
    name: string|null;
    email: string|null;
    date: string|null;
  }
  
export interface Node {
    messageHeadline: string|null;
    id: string|null;
    commitUrl:string|null;
    message: string|null;
    author: Author|null;
  }
  
export interface Edges {
    node: Node|null
}
  
export interface History {
    edges: (Edges|null)[]
}
  
export interface Target {
    id: string|null;
    history: History|null;
  }
  
export interface Ref {
    target: Target|null;
}
  
export interface Repository {
    ref: Ref|null;
}
  
export interface RecentCommitsType {
    repository: Repository|null
}

export interface RecentCommitsArguments {
    owner:string;
    name:string
}
