export declare namespace Jira {

  // root object for search results
  export interface IssueCollection {
    expand: string;
    startAt: number;
    maxResults: number;
    total: number;
    issues: Issue[];
  }

  export interface Issue {
    expand: string;
    id: string;
    self: string;
    key: string;
    fields: Fields;
  }

  export interface ICustomField {
    self: string;
    value: string;
    id: string;
    name?: string;
  }

  export interface Priority {
    self: string;
    iconUrl: string;
    name: string;
    id: string;
  }

  export interface Type {
    id: string;
    name: string;
    inward: string;
    outward: string;
    self: string;
  }

  export interface StatusCategory {
    self: string;
    id: number;
    key: string;
    colorName: string;
    name: string;
  }

  export interface Status {
    self: string;
    description: string;
    iconUrl: string;
    name: string;
    id: string;
    statusCategory: StatusCategory;
  }

  export interface Issuetype {
    self: string;
    id: string;
    description: string;
    iconUrl: string;
    name: string;
    subtask: boolean;
    avatarId: number;
  }

  export interface OutwardIssue {
    id: string;
    key: string;
    self: string;
    fields: DirectionalIssueFields;
  }

  export interface InwardIssue {
    id: string;
    key: string;
    self: string;
    fields: DirectionalIssueFields;
  }

  export interface Issuelink {
    id: string;
    self: string;
    type: Type;
    outwardIssue: OutwardIssue;
    inwardIssue: InwardIssue;
  }

  export interface AvatarUrls {
    '48x48': string;
    '24x24': string;
    '16x16': string;
    '32x32': string;
  }

  export interface Assignee {
    self: string;
    name: string;
    key: string;
    emailAddress: string;
    avatarUrls: AvatarUrls;
    displayName: string;
    active: boolean;
    timeZone: string;
  }

  export interface Component {
    self: string;
    id: string;
    name: string;
  }

  export interface Creator {
    self: string;
    name: string;
    key: string;
    emailAddress: string;
    avatarUrls: AvatarUrls;
    displayName: string;
    active: boolean;
    timeZone: string;
  }

  export interface Subtask {
    id: string;
    key: string;
    self: string;
    fields: Fields;
  }

  export interface Reporter {
    self: string;
    name: string;
    key: string;
    emailAddress: string;
    avatarUrls: AvatarUrls;
    displayName: string;
    active: boolean;
    timeZone: string;
  }

  export interface Aggregateprogress {
    progress: number;
    total: number;
    percent: number;
  }

  export interface Progress {
    progress: number;
    total: number;
    percent: number;
  }

  export interface Votes {
    self: string;
    votes: number;
    hasVoted: boolean;
  }

  export interface Project {
    self: string;
    id: string;
    key: string;
    name: string;
    avatarUrls: AvatarUrls;
  }

  export interface Watches {
    self: string;
    watchCount: number;
    isWatching: boolean;
  }

  export interface DirectionalIssueFields {
    summary: string;
    status: Status;
    priority: Priority;
    issuetype: Issuetype;
  }

  export interface Fields {
    [key: string]: ICustomField | string | number | string[] | any[] | any;
    fixVersions: any[];
    resolution?: any;
    lastViewed?: Date;
    priority: Priority;
    labels: string[];
    timeestimate?: number;
    aggregatetimeoriginalestimate?: number;
    versions: any[];
    issuelinks: Issuelink[];
    assignee: Assignee;
    status: Status;
    components: Component[];
    aggregatetimeestimate?: number;
    creator: Creator;
    subtasks: Subtask[];
    reporter: Reporter;
    aggregateprogress: Aggregateprogress;
    progress: Progress;
    votes: Votes;
    issuetype: Issuetype;
    timespent: number;
    project: Project;
    aggregatetimespent: number;
    resolutiondate?: any;
    workratio: any;
    watches: Watches;
    created: Date;
    updated: Date;
    timeoriginalestimate?: number;
    description: string;
    summary: string;
    environment?: any;
    duedate?: any;
  }

}
