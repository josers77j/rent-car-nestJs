/* filtrado de fecha por rango para prisma */
export function dateRange(
  startDate: string,
  endDate: string,
  dateColumnName: string,
) {
  if (startDate && endDate) {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    endDateObj.setDate(endDateObj.getDate() + 1);

    return {
      [dateColumnName]: {
        gte: startDateObj,
        lt: endDateObj,
      },
    };
  } else if (startDate) {
    const startDateObj = new Date(startDate);
    return {
      [dateColumnName]: {
        gte: startDateObj,
      },
    };
  } else if (endDate) {
    const endDateObj = new Date(endDate);
    endDateObj.setDate(endDateObj.getDate() + 1);

    return {
      [dateColumnName]: {
        lt: endDateObj,
      },
    };
  }

  return {};
}

export function dateRangeQueryRaw({ startDate, endDate, dateColumnName }) {
  const keyDate =
    startDate && endDate ? '01' : startDate ? '10' : endDate ? '11' : '00';

  const dateFilterOptions = {
    '00': ``,
    '01': `AND (${dateColumnName} BETWEEN '${startDate} 00:00:00' AND '${endDate} 23:59:59')`,
    '10': `AND ${dateColumnName} >= '${startDate} 00:00:00'`,
    '11': `AND ${dateColumnName} <= '${endDate} 23:59:59'`,
  };

  return dateFilterOptions[keyDate];
}
