import * as jira from './core';

(async () => {
  const creds = jira.parseArgs();
  const username = creds.username;
  const password = creds.password;

  const timesheet = await jira.getTodaysTempoReport(username, password);

  if (!timesheet) {
    throw new Error('unable to get todays time report');
  }

  const totalHoursToDo = jira.config.totalWorkDayInSeconds - jira.calculateMissingHoursToReport(timesheet);

  console.info(`hours to complete today: ${totalHoursToDo}`);

  if (totalHoursToDo > 0) {
    // gather information from Jira
    const allIssues = await jira.getJiraIssues(username, password);
    console.log(allIssues);

    const issues = jira.filterIssuesByRemaingTime(allIssues.issues);

    if (!issues || issues.length < 1) {
      throw new Error('there are no issues assigned to you and currently in progress');
    }
    const timeSplit = totalHoursToDo / issues.length;

    issues.forEach(async (issue) => {
      console.log('submitting time report');
      await jira.submitTime(username, password, issue.key, timeSplit, (issue.fields.timeestimate || 0));
    });
  }
})();
