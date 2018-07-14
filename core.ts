import * as fetch from 'node-fetch';
import { Jira } from './definitions/jira';
import { Tempo } from './definitions/tempo';

export const config = {
  totalWorkDayInSeconds: 27000,
  jiraUrl: 'https://{YOUR-JIRA-DOMAIN}',
};

export async function getJiraIssues(username: string, password: string) {
  const querystring = require('querystring');

  console.info(`getting user ${username} in progress issues...`);

  const apiUrl = `${config.jiraUrl}/rest/api/2/search`;
  const qs = querystring.stringify(
    {
      jql: `status in ("With Dev", "In Progress", "Work in progress", "Under investigation") AND assignee=${username}`,
    },
  );
  const url = `${apiUrl}?${qs}`;
  try {
    const response = await fetch.default(url, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
      },
    });
    return await response.json() as Promise<Jira.IssueCollection>;
  } catch (error) {
    throw error;
  }
}

export function parseArgs() {
  const argv = require('yargs')
    .usage('Usage: $0 -user [string] -pass [string]')
    .demandOption(['user', 'pass'])
    .argv;

  const username = (argv.user || '').trim();
  const password = argv.pass || '';

  if (/@/.test(username)) {
    throw new Error('invalid username, please use your Jira username (not your email)');
  }

  if (!/[\w\d-]/.test(username) || username.length < 3) {
    let errorMsg = 'invalid username provided. Please check you user name at ';
    errorMsg += `"${config.jiraUrl}/rest/api/2/user/assignable/search?project=IP&maxResults=1000"`;
    throw new Error(errorMsg);
  }

  if (password.length < 1) {
    throw new Error('invalid password provided (empty passwords not supported');
  }

  return {
    username,
    password,
  };
}

export async function getTodaysTempoReport(username: string, password: string) {
  const querystring = require('querystring');

  console.info(`getting user ${username} todays tempo report...`);

  const simpleTodayDate = getDateSimpleFormat();

  const apiUrl = `${config.jiraUrl}/rest/tempo-timesheets/3/worklogs`;
  const qs = querystring.stringify(
    {
      username,
      dateFrom: simpleTodayDate,
      dateTo: simpleTodayDate,
    },
  );
  const url = `${apiUrl}?${qs}`;
  try {
    const response = await fetch.default(url, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
      },
    });

    return await response.json() as Promise<Tempo.Worklog[]>;
  } catch (error) {
    throw error;
  }
}

export async function submitTime(username: string, password: string, issueKey: string, timeSpent: number, remainTime: number) {
  console.info(`submit user ${username} todays tempo report...`);

  const jsonBody = {
    timeSpentSeconds: timeSpent,
    dateStarted: getDateIsoString(),
    author: {
      name: username,
    },
    issue: {
      key: issueKey,
      remainingEstimateSeconds: remainTime,
    },
  };
  const body = JSON.stringify(jsonBody);

  const url = `${config.jiraUrl}/rest/tempo-timesheets/3/worklogs`;
  try {
    const response = await fetch.default(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body,
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function filterIssuesByRemaingTime(issues: Jira.Issue[]) {
  return issues.filter((issue) => (issue.fields.timeestimate || 0) > 0);
}

export function calculateMissingHoursToReport(tempoReport: Tempo.Worklog[]): number {
  let totalSpentToday = 0;
  tempoReport.forEach((entry) => {
    totalSpentToday += entry.timeSpentSeconds || 0;
  });

  return totalSpentToday;
}

function getDateIsoString() {
  const myDate = new Date();
  return new Date(Date.UTC(myDate.getFullYear(), myDate.getMonth(), myDate.getDate())).toISOString();
}

function getDateSimpleFormat() {
  const myDate = new Date();
  const month = myDate.getMonth() < 10 ? `0${myDate.getMonth() + 1}` : myDate.getMonth() + 1;
  const day = myDate.getDate() < 10 ? `0${myDate.getDate()}` : myDate.getDate();
  return `${myDate.getFullYear()}-${month}-${day}`;
}
