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
