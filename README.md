# tempo.io time track submitter

Simple script to submit time track report. Targeting JIRA app https://www.tempo.io/

The current implementation searches for JIRA issues in status: "With Dev", "In Progress", "Work in progress", "Under investigation"; and assigned to the provided user. Gets today's current Tempo.io time track log. If today's report is not completely filled in, evenly spit the remaining hours across all the tickets found in the first step.


## usage

(requires [node.js](https://nodejs.org)) after cloning the repository, run the following commands:

- `npm install`
- `npm start -- -user YOUR_JIRA_USERNAME -pass YOUR_JIRA_PASSWORD`


# configuration

At the moment, configuration settings are store in `./core.ts` config constant.

For authentication with JIRA, Basic Authentication is used https://developer.atlassian.com/server/jira/platform/basic-authentication/


## API usage samples (for development purposes)

- get specific day tempo.io report for a user https://your.jira.server/rest/tempo-timesheets/3/worklogs?username=jlouros&dateFrom=2018-06-24&dateTo=2018-06-30
- search JIRA issues assigned to a user, within a set of issue status  https://your.jira.server/rest/api/2/search?jql=status%20in%20(%22With%20Dev%22%2C%20%22In%20Progress%22%2C%20%22Work%20in%20progress%22%2C%20%22Under%20investigation%22)%20AND%20assignee=jlouros
- get JIRA users belonging to a particular project https://your.jira.server/rest/api/2/user/assignable/search?project=IP&maxResults=1000


## references

- Tempo.io REST API reference http://developer.tempo.io/doc/timesheets/api/rest/latest
- JIRA REST API reference https://docs.atlassian.com/jira-software/REST/7.3.1/
