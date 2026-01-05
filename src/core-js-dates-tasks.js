function dateToTimestamp(date) {
  return new Date(date).getTime();
}

function getTime(date) {
  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');
  const s = String(date.getSeconds()).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function getDayName(date) {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    timeZone: 'UTC',
  });
}

function getNextFriday(date) {
  const result = new Date(date);
  const day = result.getUTCDay();
  const diff = (12 - day) % 7 || 7;
  result.setUTCDate(result.getUTCDate() + diff);
  return result;
}

function getCountDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

function getCountDaysOnPeriod(dateStart, dateEnd) {
  const start = new Date(dateStart);
  const end = new Date(dateEnd);
  return Math.floor((end - start) / 86400000) + 1;
}

function isDateInPeriod(date, period) {
  const d = new Date(date);
  const start = new Date(period.start);
  const end = new Date(period.end);
  return d >= start && d <= end;
}

function formatDate(date) {
  return new Date(date).toLocaleString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'UTC',
  });
}

function getCountWeekendsInMonth(month, year) {
  let count = 0;
  const days = new Date(year, month, 0).getDate();

  for (let i = 1; i <= days; i += 1) {
    const day = new Date(Date.UTC(year, month - 1, i)).getUTCDay();
    if (day === 0 || day === 6) count += 1;
  }

  return count;
}

function getWeekNumberByDate(date) {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

function getNextFridayThe13th(date) {
  let year = date.getFullYear();
  let month = date.getMonth();

  while (year < 3000) {
    const candidate = new Date(year, month, 13);
    if (candidate > date && candidate.getDay() === 5) {
      return candidate;
    }

    month += 1;
    if (month === 12) {
      month = 0;
      year += 1;
    }
  }

  return null;
}

function getQuarter(date) {
  return Math.floor(date.getMonth() / 3) + 1;
}

function getWorkSchedule(period, countWorkDays, countOffDays) {
  const result = [];
  const [sd, sm, sy] = period.start.split('-').map(Number);
  const [ed, em, ey] = period.end.split('-').map(Number);

  const current = new Date(sy, sm - 1, sd);
  const end = new Date(ey, em - 1, ed);

  let isWork = true;
  let counter = 0;

  while (current <= end) {
    if (isWork) {
      result.push(
        `${String(current.getDate()).padStart(2, '0')}-${String(
          current.getMonth() + 1
        ).padStart(2, '0')}-${current.getFullYear()}`
      );
    }

    counter += 1;

    if (isWork && counter === countWorkDays) {
      isWork = false;
      counter = 0;
    } else if (!isWork && counter === countOffDays) {
      isWork = true;
      counter = 0;
    }

    current.setDate(current.getDate() + 1);
  }

  return result;
}

function isLeapYear(date) {
  const year = date.getFullYear();
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

module.exports = {
  dateToTimestamp,
  getTime,
  getDayName,
  getNextFriday,
  getCountDaysInMonth,
  getCountDaysOnPeriod,
  isDateInPeriod,
  formatDate,
  getCountWeekendsInMonth,
  getWeekNumberByDate,
  getNextFridayThe13th,
  getQuarter,
  getWorkSchedule,
  isLeapYear,
};
