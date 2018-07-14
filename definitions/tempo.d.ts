export declare namespace Tempo {

  export interface Worklog {
    timeSpentSeconds: number;
    billedSeconds?: number;
    dateStarted: Date;
    dateCreated?: Date;
    dateUpdated?: Date;
    comment?: string;
    self?: string;
    id?: number;
    jiraWorklogId?: number;
    author: Author;
    issue: Issue;
    worklogAttributes?: any[];
    workAttributeValues?: any[];
  }

  export interface Author {
    self?: string;
    name: string;
    key?: string;
    displayName?: string;
    avatar?: string;
  }

  export interface IssueType {
    name: string;
    iconUrl: string;
  }

  export interface Issue {
    id?: number;
    self?: string;
    projectId?: number;
    key: string;
    remainingEstimateSeconds: number;
    issueType?: IssueType;
    summary?: string;
  }
}
