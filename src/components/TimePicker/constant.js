import moment from "moment";

const locale = {
  en_US: {
    TODAY: "today",
    ONE_HOUR: "1 hour",
    TWENTY_FOUR_HOURS: "24 hours",
    SEVEN_DAYS: "7 days",
    THIRTY_DAYS: "30 days"
  },
  zh_CN: {
    TODAY: "今天",
    ONE_HOUR: "1小时",
    TWENTY_FOUR_HOURS: "24小时",
    SEVEN_DAYS: "7天",
    THIRTY_DAYS: "30天"
  }
};

export const timeRange = currentLocale => {
  const cur = locale[currentLocale];
  return [
    {
      name: cur.TODAY,
      value: "today"
    },
    {
      name: cur.ONE_HOUR,
      value: "one_hour"
    },
    {
      name: cur.TWENTY_FOUR_HOURS,
      value: "twenty_four_hours"
    },
    {
      name: cur.SEVEN_DAYS,
      value: "seven_days"
    },
    {
      name: cur.THIRTY_DAYS,
      value: "thirty_days"
    }
  ];
};

export const btnTimeRange = (currentLocale, max7d = false) =>
  timeRange(currentLocale)
    .slice(2, max7d ? -1 : undefined)
    .map(item => ({
      label: item.name,
      value: item.value
    }));

export const getStartAndEndTime = rangeType => {
  const curHour = new Date().getHours();
  const cur = moment({ hour: curHour });
  const nextHour = cur.clone().add(1, "hours");
  switch (rangeType) {
    case "one_hour":
      return {
        start: new Date(cur.subtract(1, "hours")),
        end: new Date(nextHour)
      };
    case "twenty_four_hours":
      return {
        start: new Date(cur.subtract(1, "days")),
        end: new Date(nextHour)
      };
    case "today":
      return {
        start: new Date(
          cur
            .hour(0)
            .minute(0)
            .second(0)
        ),
        end: new Date(nextHour)
      };
    case "seven_days":
      return {
        start: new Date(
          cur
            .subtract(7, "days")
            .hour(0)
            .minute(0)
            .second(0)
        ),
        end: new Date(nextHour)
      };
    case "thirty_days":
      return {
        start: new Date(
          cur
            .subtract(30, "days")
            .hour(0)
            .minute(0)
            .second(0)
        ),
        end: new Date(nextHour)
      };

    default:
      return {};
  }
};
export const ranges = {
  "1小时": [
    moment(getStartAndEndTime("one_hour").start),
    moment(getStartAndEndTime("one_hour").end)
  ],
  "24小时": [
    moment(getStartAndEndTime("twenty_four_hours").start),
    moment(getStartAndEndTime("twenty_four_hours").end)
  ],
  今天: [
    moment(getStartAndEndTime("today").start),
    moment(getStartAndEndTime("today").end)
  ],
  最近7天: [
    moment(getStartAndEndTime("seven_days").start),
    moment(getStartAndEndTime("seven_days").end)
  ],
  最近30天: [
    moment(getStartAndEndTime("thirty_days").start),
    moment(getStartAndEndTime("thirty_days").end)
  ]
};
