import { CronJob } from 'cron';
import createContext from 'context';
import Expo from 'expo-server-sdk';

const userJobs = {};

const notify = ({ userId, pushToken, time, timeZone }) => {
  if (userJobs[userId]) {
    userJobs[userId].stop();
  }
  userJobs[userId] = new CronJob({
    cronTime: time,
    onTick,
    start: true,
    timeZone: timeZone,
    context: {
      context: createContext(),
      userId,
      pushToken,
    },
  });
};

async function onTick() {
  const { userId, pushToken } = this;
  if (Expo.isExpoPushToken(pushToken)) {
    console.log(`Sending push notification to user id ${userId}!`);
  } else {
    console.log('Invalid push token.');
  }
}

export { notify };
