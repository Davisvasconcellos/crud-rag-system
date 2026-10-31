export interface ChartCardMeta {
  id: string;
  chartId: string;
  title: string;
  colSpan: string;
  height: number;
  category: "Overview" | "Lines" | "Areas" | "Bars" | "Specialized";
  hasDropdown?: boolean;
  hasLegendList?: boolean;
  stats?: { label: string; value: string; color: string }[];
  legends?: { label: string; value: string; color: string }[];
}

export const CHART_CARDS_LIST: ChartCardMeta[] = [
  {
    "id": "active-users",
    "chartId": "chart-active-users-2",
    "title": "Active users",
    "colSpan": "col-span-12",
    "height": 288,
    "category": "Overview",
    "hasDropdown": true,
    "stats": [
      {
        "label": "Mobile",
        "value": "10,601",
        "color": "bg-blue-600"
      },
      {
        "label": "Desktop",
        "value": "6,109",
        "color": "bg-sky-500"
      },
      {
        "label": "Tablet",
        "value": "2,260",
        "color": "bg-emerald-500"
      }
    ]
  },
  {
    "id": "chart-with-legend",
    "chartId": "chart-legend-demo",
    "title": "Chart with legend",
    "colSpan": "col-span-12",
    "height": 240,
    "category": "Overview",
    "hasLegendList": true,
    "legends": [
      {
        "label": "Total visits",
        "value": "63.0k",
        "color": "text-amber-500"
      },
      {
        "label": "Unique visitors",
        "value": "43.0k",
        "color": "text-emerald-500"
      },
      {
        "label": "Pageviews",
        "value": "120.5k",
        "color": "text-blue-600"
      }
    ]
  },
  {
    "id": "social-referrals",
    "chartId": "chart-social-referrals",
    "title": "Social referrals",
    "colSpan": "col-span-12 md:col-span-6 lg:col-span-4",
    "height": 240,
    "category": "Lines"
  },
  {
    "id": "sprint-velocity",
    "chartId": "chart-tasks-overview",
    "title": "Sprint velocity",
    "colSpan": "col-span-12 lg:col-span-8",
    "height": 240,
    "category": "Bars"
  },
  {
    "id": "line-chart",
    "chartId": "chart-completion-tasks-2",
    "title": "Line chart",
    "colSpan": "col-span-12 md:col-span-6 lg:col-span-4",
    "height": 240,
    "category": "Lines"
  },
  {
    "id": "straight-line",
    "chartId": "chart-completion-tasks-4",
    "title": "Straight line",
    "colSpan": "col-span-12 md:col-span-6 lg:col-span-4",
    "height": 240,
    "category": "Lines"
  },
  {
    "id": "stepped-line",
    "chartId": "chart-completion-tasks-5",
    "title": "Stepped line",
    "colSpan": "col-span-12 md:col-span-6 lg:col-span-4",
    "height": 240,
    "category": "Lines"
  },
  {
    "id": "data-labels",
    "chartId": "chart-completion-tasks-7",
    "title": "Data labels",
    "colSpan": "col-span-12 md:col-span-6 lg:col-span-4",
    "height": 240,
    "category": "Lines"
  },
  {
    "id": "issue-activity",
    "chartId": "chart-tasks",
    "title": "Issue activity",
    "colSpan": "col-span-12 lg:col-span-8",
    "height": 320,
    "category": "Bars"
  },
  {
    "id": "revenue-by-plan",
    "chartId": "chart-line",
    "title": "Revenue by plan",
    "colSpan": "col-span-12 md:col-span-6 lg:col-span-4",
    "height": 240,
    "category": "Lines"
  },
  {
    "id": "signups-by-channel",
    "chartId": "chart-line-stroke",
    "title": "Signups by channel",
    "colSpan": "col-span-12 md:col-span-6 lg:col-span-4",
    "height": 240,
    "category": "Lines"
  },
  {
    "id": "cpu-load",
    "chartId": "chart-spline",
    "title": "CPU load",
    "colSpan": "col-span-12 md:col-span-6 lg:col-span-4",
    "height": 240,
    "category": "Lines"
  },
  {
    "id": "average-temperature",
    "chartId": "chart-temperature",
    "title": "Average temperature",
    "colSpan": "col-span-12 lg:col-span-6",
    "height": 240,
    "category": "Lines"
  },
  {
    "id": "running-instances",
    "chartId": "chart-stepline",
    "title": "Running instances",
    "colSpan": "col-span-12 lg:col-span-6",
    "height": 240,
    "category": "Lines"
  },
  {
    "id": "area-chart",
    "chartId": "chart-completion-tasks-3",
    "title": "Area chart",
    "colSpan": "col-span-12 md:col-span-6 lg:col-span-4",
    "height": 240,
    "category": "Areas"
  },
  {
    "id": "two-areas",
    "chartId": "chart-completion-tasks-10",
    "title": "Two areas",
    "colSpan": "col-span-12 md:col-span-6 lg:col-span-4",
    "height": 240,
    "category": "Areas"
  },
  {
    "id": "stacked-areas",
    "chartId": "chart-completion-tasks-11",
    "title": "Stacked areas",
    "colSpan": "col-span-12 md:col-span-6 lg:col-span-4",
    "height": 240,
    "category": "Areas"
  },
  {
    "id": "sessions-by-device",
    "chartId": "chart-area",
    "title": "Sessions by device",
    "colSpan": "col-span-12 md:col-span-6 lg:col-span-4",
    "height": 240,
    "category": "Areas"
  },
  {
    "id": "bandwidth-usage",
    "chartId": "chart-area-spline",
    "title": "Bandwidth usage",
    "colSpan": "col-span-12 md:col-span-6 lg:col-span-4",
    "height": 240,
    "category": "Areas"
  },
  {
    "id": "storage-by-bucket",
    "chartId": "chart-area-spline-stacked",
    "title": "Storage by bucket",
    "colSpan": "col-span-12 md:col-span-6 lg:col-span-4",
    "height": 240,
    "category": "Areas"
  },
  {
    "id": "bar-chart",
    "chartId": "chart-completion-tasks",
    "title": "Bar chart",
    "colSpan": "col-span-12 md:col-span-6 lg:col-span-4",
    "height": 240,
    "category": "Bars"
  },
  {
    "id": "horizontal-bars",
    "chartId": "chart-completion-tasks-6",
    "title": "Horizontal bars",
    "colSpan": "col-span-12 md:col-span-6 lg:col-span-4",
    "height": 240,
    "category": "Bars"
  },
  {
    "id": "grouped-bars",
    "chartId": "chart-completion-tasks-8",
    "title": "Grouped bars",
    "colSpan": "col-span-12 md:col-span-6 lg:col-span-4",
    "height": 240,
    "category": "Bars"
  },
  {
    "id": "stacked-bars",
    "chartId": "chart-completion-tasks-9",
    "title": "Stacked bars",
    "colSpan": "col-span-12 md:col-span-6 lg:col-span-4",
    "height": 240,
    "category": "Bars"
  },
  {
    "id": "semantic-colors",
    "chartId": "chart-cache-status",
    "title": "Semantic colors",
    "colSpan": "col-span-12 md:col-span-6 lg:col-span-4",
    "height": 240,
    "category": "Bars"
  },
  {
    "id": "signup-funnel",
    "chartId": "chart-funnel",
    "title": "Signup funnel",
    "colSpan": "col-span-12 md:col-span-6 lg:col-span-4",
    "height": 240,
    "category": "Specialized"
  },
  {
    "id": "traffic-sources",
    "chartId": "chart-demo-pie",
    "title": "Traffic sources",
    "colSpan": "col-span-12 md:col-span-6 lg:col-span-4",
    "height": 240,
    "category": "Specialized"
  },
  {
    "id": "email-campaign",
    "chartId": "chart-campaigns",
    "title": "Email campaign",
    "colSpan": "col-span-12 md:col-span-6 lg:col-span-4",
    "height": 240,
    "category": "Specialized"
  },
  {
    "id": "sales-by-region",
    "chartId": "chart-polar-area",
    "title": "Sales by region",
    "colSpan": "col-span-12 md:col-span-6 lg:col-span-4",
    "height": 240,
    "category": "Specialized"
  },
  {
    "id": "spend-and-leads",
    "chartId": "chart-combination",
    "title": "Spend and leads",
    "colSpan": "col-span-12 lg:col-span-8",
    "height": 240,
    "category": "Specialized"
  },
  {
    "id": "plan-comparison",
    "chartId": "chart-radar",
    "title": "Plan comparison",
    "colSpan": "col-span-12 md:col-span-6 lg:col-span-4",
    "height": 240,
    "category": "Specialized"
  },
  {
    "id": "page-load-time",
    "chartId": "chart-scatter",
    "title": "Page load time",
    "colSpan": "col-span-12 md:col-span-6 lg:col-span-4",
    "height": 240,
    "category": "Specialized"
  },
  {
    "id": "release-roadmap",
    "chartId": "chart-timeline",
    "title": "Release roadmap",
    "colSpan": "col-span-12 lg:col-span-8",
    "height": 240,
    "category": "Specialized"
  },
  {
    "id": "campaign-performance",
    "chartId": "chart-bubble",
    "title": "Campaign performance",
    "colSpan": "col-span-12 md:col-span-6 lg:col-span-4",
    "height": 240,
    "category": "Specialized"
  },
  {
    "id": "storage-by-folder",
    "chartId": "chart-treemap",
    "title": "Storage by folder",
    "colSpan": "col-span-12 md:col-span-6 lg:col-span-4",
    "height": 240,
    "category": "Specialized"
  },
  {
    "id": "api-response-times",
    "chartId": "chart-box-plot",
    "title": "API response times",
    "colSpan": "col-span-12 md:col-span-6 lg:col-span-4",
    "height": 240,
    "category": "Specialized"
  }
];

export const TABLER_CHART_CONFIGS: Record<string, any> = {
  "chart-active-users-2": {
    "chart": {
      "id": "active-users-2",
      "type": "line",
      "fontFamily": "inherit",
      "height": 288,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": false
      },
      "animations": {
        "enabled": false
      }
    },
    "stroke": {
      "width": 2,
      "lineCap": "round",
      "curve": "straight"
    },
    "series": [
      {
        "name": "Mobile",
        "data": [
          10113,
          9996,
          9273,
          9891,
          9497,
          9420,
          10154,
          10168,
          10183,
          9879,
          10079,
          10354,
          10583,
          10611,
          10819,
          10774,
          10680,
          12059,
          11914,
          10686,
          10486,
          11667,
          10919,
          10421,
          10592,
          11153,
          10723,
          11524,
          11583,
          11830
        ]
      },
      {
        "name": "Desktop",
        "data": [
          3813,
          3597,
          6934,
          6985,
          7484,
          7383,
          6554,
          3857,
          3570,
          6991,
          7402,
          7379,
          7493,
          6487,
          3767,
          3798,
          7319,
          9043,
          8040,
          7468,
          6584,
          3834,
          3614,
          7252,
          7660,
          7374,
          7268,
          6658,
          3974,
          3675
        ]
      },
      {
        "name": "Tablet",
        "data": [
          2696,
          2696,
          1941,
          1834,
          1967,
          2077,
          2003,
          2480,
          2570,
          2031,
          1918,
          1910,
          2090,
          2063,
          2758,
          2742,
          1872,
          1950,
          1900,
          1992,
          2296,
          2644,
          2937,
          2018,
          1908,
          2023,
          2207,
          2321,
          2899,
          3061
        ]
      }
    ],
    "grid": {
      "padding": {
        "top": -20,
        "right": 0,
        "left": -4,
        "bottom": -4
      },
      "strokeDashArray": 4
    },
    "xaxis": {
      "labels": {
        "padding": 0
      },
      "tooltip": {
        "enabled": false
      },
      "type": "datetime"
    },
    "yaxis": {
      "labels": {
        "padding": 4
      }
    },
    "labels": [
      "2020-06-20",
      "2020-06-21",
      "2020-06-22",
      "2020-06-23",
      "2020-06-24",
      "2020-06-25",
      "2020-06-26",
      "2020-06-27",
      "2020-06-28",
      "2020-06-29",
      "2020-06-30",
      "2020-07-01",
      "2020-07-02",
      "2020-07-03",
      "2020-07-04",
      "2020-07-05",
      "2020-07-06",
      "2020-07-07",
      "2020-07-08",
      "2020-07-09",
      "2020-07-10",
      "2020-07-11",
      "2020-07-12",
      "2020-07-13",
      "2020-07-14",
      "2020-07-15",
      "2020-07-16",
      "2020-07-17",
      "2020-07-18",
      "2020-07-19"
    ],
    "colors": [
      "#066fd1",
      "#066fd1",
      "#066fd1"
    ],
    "legend": {
      "show": false
    }
  },
  "chart-legend-demo": {
    "chart": {
      "id": "legend-demo",
      "type": "line",
      "fontFamily": "inherit",
      "height": 240,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": false
      },
      "animations": {
        "enabled": false
      }
    },
    "stroke": {
      "width": 2,
      "lineCap": "round",
      "curve": "straight"
    },
    "series": [
      {
        "name": "Total visits",
        "data": [
          1329,
          1228,
          1995,
          2217,
          2276,
          2166,
          2047,
          1373,
          1314,
          2286,
          2401,
          2327,
          2405,
          2171,
          1568,
          1453,
          2399,
          3181,
          2856,
          2539,
          2359,
          1624,
          1574,
          2515,
          2681,
          2654,
          2505,
          2304,
          1631,
          1662
        ]
      },
      {
        "name": "Unique visitors",
        "data": [
          887,
          843,
          1367,
          1471,
          1596,
          1498,
          1392,
          965,
          875,
          1529,
          1629,
          1543,
          1639,
          1482,
          1090,
          997,
          1618,
          2166,
          1955,
          1773,
          1594,
          1119,
          1113,
          1668,
          1903,
          1803,
          1711,
          1527,
          1097,
          1104
        ]
      },
      {
        "name": "New users",
        "data": [
          291,
          255,
          374,
          409,
          449,
          532,
          498,
          286,
          261,
          493,
          520,
          445,
          489,
          440,
          318,
          348,
          580,
          732,
          535,
          570,
          530,
          348,
          348,
          556,
          655,
          595,
          488,
          518,
          335,
          343
        ]
      }
    ],
    "grid": {
      "padding": {
        "top": -20,
        "right": 0,
        "left": -4,
        "bottom": -4
      },
      "strokeDashArray": 4
    },
    "xaxis": {
      "labels": {
        "padding": 0
      },
      "tooltip": {
        "enabled": false
      },
      "type": "datetime"
    },
    "yaxis": {
      "labels": {
        "padding": 4
      }
    },
    "labels": [
      "2020-06-20",
      "2020-06-21",
      "2020-06-22",
      "2020-06-23",
      "2020-06-24",
      "2020-06-25",
      "2020-06-26",
      "2020-06-27",
      "2020-06-28",
      "2020-06-29",
      "2020-06-30",
      "2020-07-01",
      "2020-07-02",
      "2020-07-03",
      "2020-07-04",
      "2020-07-05",
      "2020-07-06",
      "2020-07-07",
      "2020-07-08",
      "2020-07-09",
      "2020-07-10",
      "2020-07-11",
      "2020-07-12",
      "2020-07-13",
      "2020-07-14",
      "2020-07-15",
      "2020-07-16",
      "2020-07-17",
      "2020-07-18",
      "2020-07-19"
    ],
    "colors": [
      "#066fd1",
      "#066fd1",
      "#066fd1"
    ],
    "legend": {
      "show": false
    }
  },
  "chart-social-referrals": {
    "chart": {
      "id": "social-referrals",
      "type": "line",
      "fontFamily": "inherit",
      "height": 288,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": false
      },
      "animations": {
        "enabled": false
      }
    },
    "stroke": {
      "width": 2,
      "lineCap": "round",
      "curve": "smooth"
    },
    "series": [
      {
        "name": "Facebook",
        "data": [
          13281,
          8521,
          15038,
          9983,
          15417,
          8888,
          7052,
          14270,
          5214,
          9587,
          5950,
          16852,
          17836,
          12217,
          17406,
          12262,
          9147,
          14961,
          18292,
          15230,
          13435,
          10649,
          5140,
          13680,
          4508,
          13271,
          13413,
          5543,
          18727,
          18238,
          18175,
          6246,
          5864,
          17847,
          9170,
          6445,
          12945,
          8142,
          8980,
          10422,
          15535,
          11569,
          10114,
          17621,
          16138,
          13046,
          6652,
          9906,
          14100,
          16495,
          6749
        ]
      },
      {
        "name": "Twitter",
        "data": [
          3680,
          1862,
          3070,
          2252,
          5348,
          3091,
          3000,
          3984,
          5176,
          5325,
          2420,
          5474,
          3098,
          1893,
          3748,
          2879,
          4197,
          5186,
          4213,
          4334,
          2807,
          1594,
          4863,
          2030,
          3752,
          4856,
          5341,
          3954,
          3461,
          3097,
          3404,
          4949,
          2283,
          3227,
          3630,
          2360,
          3477,
          4675,
          1901,
          2252,
          3347,
          2954,
          5029,
          2079,
          2830,
          3292,
          4578,
          3401,
          4104,
          3749,
          4457,
          3734
        ]
      },
      {
        "name": "Dribbble",
        "data": [
          722,
          1866,
          961,
          1108,
          1110,
          561,
          1753,
          1815,
          1985,
          776,
          859,
          547,
          1488,
          766,
          702,
          621,
          1599,
          1372,
          1620,
          963,
          759,
          764,
          739,
          789,
          1696,
          1454,
          1842,
          734,
          551,
          1689,
          1924,
          1875,
          908,
          1675,
          1541,
          1953,
          534,
          502,
          1524,
          1867,
          719,
          1472,
          1608,
          1025,
          889,
          1150,
          654,
          1695,
          1662,
          1285,
          1787
        ]
      }
    ],
    "grid": {
      "padding": {
        "top": -20,
        "right": 0,
        "left": -4,
        "bottom": -4
      },
      "strokeDashArray": 4,
      "xaxis": {
        "lines": {
          "show": true
        }
      }
    },
    "xaxis": {
      "labels": {
        "padding": 0
      },
      "tooltip": {
        "enabled": false
      },
      "type": "datetime"
    },
    "yaxis": {
      "labels": {
        "padding": 4
      }
    },
    "labels": [
      "2020-06-20",
      "2020-06-21",
      "2020-06-22",
      "2020-06-23",
      "2020-06-24",
      "2020-06-25",
      "2020-06-26",
      "2020-06-27",
      "2020-06-28",
      "2020-06-29",
      "2020-06-30",
      "2020-07-01",
      "2020-07-02",
      "2020-07-03",
      "2020-07-04",
      "2020-07-05",
      "2020-07-06",
      "2020-07-07",
      "2020-07-08",
      "2020-07-09",
      "2020-07-10",
      "2020-07-11",
      "2020-07-12",
      "2020-07-13",
      "2020-07-14",
      "2020-07-15",
      "2020-07-16",
      "2020-07-17",
      "2020-07-18",
      "2020-07-19",
      "2020-07-20",
      "2020-07-21",
      "2020-07-22",
      "2020-07-23",
      "2020-07-24",
      "2020-07-25",
      "2020-07-26",
      "2020-07-27",
      "2020-07-28",
      "2020-07-29",
      "2020-07-30",
      "2020-07-31",
      "2020-08-01",
      "2020-08-02",
      "2020-08-03",
      "2020-08-04",
      "2020-08-05",
      "2020-08-06",
      "2020-08-07",
      "2020-08-08",
      "2020-08-09"
    ],
    "colors": [
      "#066fd1",
      "#066fd1",
      "#066fd1"
    ],
    "legend": {
      "show": true,
      "position": "bottom",
      "offsetY": 12,
      "markers": {
        "size": 5,
        "strokeWidth": 0,
        "shape": "circle"
      },
      "itemMargin": {
        "horizontal": 8,
        "vertical": 8
      }
    }
  },
  "chart-tasks-overview": {
    "chart": {
      "id": "tasks-overview",
      "type": "bar",
      "fontFamily": "inherit",
      "height": 320,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": false
      },
      "animations": {
        "enabled": false
      }
    },
    "plotOptions": {
      "bar": {
        "columnWidth": "50%"
      }
    },
    "dataLabels": {
      "enabled": false
    },
    "series": [
      {
        "name": "Story points",
        "data": [
          44,
          32,
          48,
          72,
          60,
          16,
          44,
          32,
          78,
          50,
          68,
          34,
          26,
          48,
          72,
          60,
          84,
          64,
          74,
          52,
          62,
          50,
          32,
          22
        ]
      }
    ],
    "grid": {
      "padding": {
        "top": -20,
        "right": 0,
        "left": -4,
        "bottom": -4
      },
      "strokeDashArray": 4
    },
    "xaxis": {
      "labels": {
        "padding": 0
      },
      "tooltip": {
        "enabled": false
      },
      "axisBorder": {
        "show": false
      },
      "categories": [
        "Sprint 1",
        "Sprint 2",
        "Sprint 3",
        "Sprint 4",
        "Sprint 5",
        "Sprint 6",
        "Sprint 7",
        "Sprint 8",
        "Sprint 9",
        "Sprint 10",
        "Sprint 11",
        "Sprint 12",
        "Sprint 13",
        "Sprint 14",
        "Sprint 15",
        "Sprint 16",
        "Sprint 17",
        "Sprint 18",
        "Sprint 19",
        "Sprint 20",
        "Sprint 21",
        "Sprint 22",
        "Sprint 23",
        "Sprint 24"
      ]
    },
    "yaxis": {
      "labels": {
        "padding": 4
      }
    },
    "colors": [
      "#066fd1"
    ],
    "legend": {
      "show": false
    }
  },
  "chart-completion-tasks-2": {
    "chart": {
      "id": "completion-tasks-2",
      "type": "line",
      "fontFamily": "inherit",
      "height": 240,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": false
      },
      "animations": {
        "enabled": false
      }
    },
    "stroke": {
      "width": 2,
      "lineCap": "round",
      "curve": "smooth"
    },
    "series": [
      {
        "name": "Tickets solved",
        "data": [
          38,
          44,
          41,
          52,
          47,
          21,
          17
        ]
      }
    ],
    "grid": {
      "padding": {
        "top": -20,
        "right": 0,
        "left": -4,
        "bottom": -4
      },
      "strokeDashArray": 4
    },
    "xaxis": {
      "labels": {
        "padding": 0
      },
      "tooltip": {
        "enabled": false
      },
      "categories": [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
      ]
    },
    "yaxis": {
      "labels": {
        "padding": 4
      }
    },
    "colors": [
      "#066fd1"
    ],
    "legend": {
      "show": false
    }
  },
  "chart-completion-tasks-4": {
    "chart": {
      "id": "completion-tasks-4",
      "type": "line",
      "fontFamily": "inherit",
      "height": 240,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": false
      },
      "animations": {
        "enabled": false
      }
    },
    "stroke": {
      "width": 2,
      "lineCap": "round",
      "curve": "straight"
    },
    "series": [
      {
        "name": "Tickets solved",
        "data": [
          38,
          44,
          41,
          52,
          47,
          21,
          17
        ]
      }
    ],
    "grid": {
      "padding": {
        "top": -20,
        "right": 0,
        "left": -4,
        "bottom": -4
      },
      "strokeDashArray": 4
    },
    "xaxis": {
      "labels": {
        "padding": 0
      },
      "tooltip": {
        "enabled": false
      },
      "categories": [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
      ]
    },
    "yaxis": {
      "labels": {
        "padding": 4
      }
    },
    "colors": [
      "#066fd1"
    ],
    "legend": {
      "show": false
    }
  },
  "chart-completion-tasks-5": {
    "chart": {
      "id": "completion-tasks-5",
      "type": "line",
      "fontFamily": "inherit",
      "height": 240,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": false
      },
      "animations": {
        "enabled": false
      }
    },
    "stroke": {
      "width": 2,
      "lineCap": "round",
      "curve": "stepline"
    },
    "series": [
      {
        "name": "Tickets solved",
        "data": [
          38,
          44,
          41,
          52,
          47,
          21,
          17
        ]
      }
    ],
    "grid": {
      "padding": {
        "top": -20,
        "right": 0,
        "left": -4,
        "bottom": -4
      },
      "strokeDashArray": 4
    },
    "xaxis": {
      "labels": {
        "padding": 0
      },
      "tooltip": {
        "enabled": false
      },
      "categories": [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
      ]
    },
    "yaxis": {
      "labels": {
        "padding": 4
      }
    },
    "colors": [
      "#066fd1"
    ],
    "legend": {
      "show": false
    }
  },
  "chart-completion-tasks-7": {
    "chart": {
      "id": "completion-tasks-7",
      "type": "line",
      "fontFamily": "inherit",
      "height": 240,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": false
      },
      "animations": {
        "enabled": false
      }
    },
    "stroke": {
      "width": 2,
      "lineCap": "round",
      "curve": "smooth"
    },
    "series": [
      {
        "name": "Tickets solved",
        "data": [
          38,
          44,
          41,
          52,
          47,
          21,
          17
        ]
      }
    ],
    "grid": {
      "padding": {
        "top": -20,
        "right": 0,
        "left": -4,
        "bottom": -4
      },
      "strokeDashArray": 4
    },
    "xaxis": {
      "labels": {
        "padding": 0
      },
      "tooltip": {
        "enabled": false
      },
      "categories": [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
      ]
    },
    "yaxis": {
      "labels": {
        "padding": 4
      }
    },
    "colors": [
      "#066fd1"
    ],
    "legend": {
      "show": false
    }
  },
  "chart-tasks": {
    "chart": {
      "id": "tasks",
      "type": "line",
      "fontFamily": "inherit",
      "height": 240,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": false
      },
      "animations": {
        "enabled": false
      }
    },
    "stroke": {
      "width": 2,
      "lineCap": "round",
      "curve": "smooth"
    },
    "series": [
      {
        "name": "Opened",
        "data": [
          12,
          15,
          9,
          18,
          24,
          6,
          4,
          14,
          31,
          22,
          17,
          19,
          8,
          5,
          16,
          21,
          13
        ]
      },
      {
        "name": "Closed",
        "data": [
          8,
          11,
          12,
          14,
          19,
          4,
          3,
          9,
          26,
          18,
          21,
          15,
          6,
          4,
          12,
          17,
          15
        ]
      },
      {
        "name": "Reopened",
        "data": [
          1,
          2,
          0,
          3,
          2,
          0,
          0,
          1,
          4,
          2,
          1,
          3,
          0,
          1,
          2,
          1,
          0
        ]
      }
    ],
    "grid": {
      "padding": {
        "top": -20,
        "right": 0,
        "left": -4,
        "bottom": -4
      },
      "strokeDashArray": 4
    },
    "xaxis": {
      "labels": {
        "padding": 0
      },
      "tooltip": {
        "enabled": false
      },
      "categories": [
        "M",
        "T",
        "W",
        "T",
        "F",
        "S",
        "S",
        "M",
        "T",
        "W",
        "T",
        "F",
        "S",
        "S",
        "M",
        "T",
        "W"
      ]
    },
    "yaxis": {
      "labels": {
        "padding": 4
      }
    },
    "colors": [
      "#066fd1",
      "#066fd1",
      "#066fd1"
    ],
    "legend": {
      "show": false
    },
    "tooltip": {
      "enabled": false
    },
    "markers": {
      "size": 0,
      "hover": {
        "sizeOffset": 0
      }
    }
  },
  "chart-line": {
    "chart": {
      "id": "line",
      "type": "line",
      "fontFamily": "inherit",
      "height": 240,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": false
      },
      "animations": {
        "enabled": false
      }
    },
    "stroke": {
      "width": 2,
      "lineCap": "round",
      "curve": "straight"
    },
    "series": [
      {
        "name": "Starter",
        "data": [
          12,
          14,
          15,
          17,
          18,
          21
        ]
      },
      {
        "name": "Pro",
        "data": [
          31,
          34,
          38,
          41,
          45,
          52
        ]
      },
      {
        "name": "Enterprise",
        "data": [
          48,
          52,
          51,
          58,
          64,
          71
        ]
      }
    ],
    "grid": {
      "padding": {
        "top": -20,
        "right": 0,
        "left": -4,
        "bottom": -4
      },
      "strokeDashArray": 4
    },
    "xaxis": {
      "labels": {
        "padding": 0
      },
      "tooltip": {
        "enabled": false
      },
      "categories": [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun"
      ]
    },
    "yaxis": {
      "labels": {
        "padding": 4
      }
    },
    "colors": [
      "#066fd1",
      "#066fd1",
      "#066fd1"
    ],
    "legend": {
      "show": false
    }
  },
  "chart-line-stroke": {
    "chart": {
      "id": "line-stroke",
      "type": "line",
      "fontFamily": "inherit",
      "height": 240,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": false
      },
      "animations": {
        "enabled": false
      }
    },
    "stroke": {
      "width": 2,
      "dashArray": [
        0,
        4,
        4
      ],
      "lineCap": "round",
      "curve": "straight"
    },
    "series": [
      {
        "name": "Organic",
        "data": [
          120,
          138,
          152,
          149,
          167,
          181,
          192
        ]
      },
      {
        "name": "Paid",
        "data": [
          80,
          92,
          88,
          101,
          96,
          110,
          118
        ]
      },
      {
        "name": "Referral",
        "data": [
          35,
          41,
          38,
          47,
          52,
          49,
          58
        ]
      }
    ],
    "grid": {
      "padding": {
        "top": -20,
        "right": 0,
        "left": -4,
        "bottom": -4
      },
      "strokeDashArray": 4
    },
    "xaxis": {
      "labels": {
        "padding": 0
      },
      "tooltip": {
        "enabled": false
      },
      "categories": [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul"
      ]
    },
    "yaxis": {
      "labels": {
        "padding": 4
      }
    },
    "colors": [
      "#066fd1",
      "#066fd1",
      "#066fd1"
    ],
    "legend": {
      "show": false
    }
  },
  "chart-spline": {
    "chart": {
      "id": "spline",
      "type": "line",
      "fontFamily": "inherit",
      "height": 240,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": false
      },
      "animations": {
        "enabled": false
      }
    },
    "stroke": {
      "width": 2,
      "lineCap": "round",
      "curve": "smooth"
    },
    "series": [
      {
        "name": "Web servers",
        "data": [
          18,
          14,
          21,
          46,
          62,
          58,
          41,
          27
        ]
      },
      {
        "name": "Workers",
        "data": [
          34,
          29,
          26,
          38,
          51,
          47,
          39,
          36
        ]
      }
    ],
    "grid": {
      "padding": {
        "top": -20,
        "right": 0,
        "left": -4,
        "bottom": -4
      },
      "strokeDashArray": 4
    },
    "xaxis": {
      "labels": {
        "padding": 0
      },
      "tooltip": {
        "enabled": false
      },
      "categories": [
        "00:00",
        "03:00",
        "06:00",
        "09:00",
        "12:00",
        "15:00",
        "18:00",
        "21:00"
      ]
    },
    "yaxis": {
      "labels": {
        "padding": 4
      }
    },
    "colors": [
      "#066fd1",
      "#066fd1"
    ],
    "legend": {
      "show": false
    }
  },
  "chart-temperature": {
    "chart": {
      "id": "temperature",
      "type": "line",
      "fontFamily": "inherit",
      "height": 240,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": false
      },
      "animations": {
        "enabled": false
      }
    },
    "stroke": {
      "width": 2,
      "lineCap": "round",
      "curve": "smooth"
    },
    "series": [
      {
        "name": "Tokyo",
        "data": [
          5.8,
          6.5,
          9.7,
          14.8,
          19.2,
          22.4,
          26.1,
          27.6,
          24.3,
          18.7,
          13.4,
          8.6
        ]
      },
      {
        "name": "London",
        "data": [
          5.2,
          5.4,
          7.3,
          9.8,
          13.1,
          16.2,
          18.7,
          18.4,
          15.9,
          12.3,
          8.4,
          5.9
        ]
      }
    ],
    "grid": {
      "padding": {
        "top": -20,
        "right": 0,
        "left": -4,
        "bottom": -4
      },
      "strokeDashArray": 4
    },
    "dataLabels": {
      "enabled": true
    },
    "xaxis": {
      "labels": {
        "padding": 0
      },
      "tooltip": {
        "enabled": false
      },
      "categories": [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ]
    },
    "yaxis": {
      "labels": {
        "padding": 4
      }
    },
    "colors": [
      "#066fd1",
      "#066fd1"
    ],
    "legend": {
      "show": false
    },
    "markers": {
      "size": 2
    }
  },
  "chart-stepline": {
    "chart": {
      "id": "stepline",
      "type": "line",
      "fontFamily": "inherit",
      "height": 240,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": false
      },
      "animations": {
        "enabled": false
      }
    },
    "stroke": {
      "width": 2,
      "lineCap": "round",
      "curve": "stepline"
    },
    "series": [
      {
        "name": "Instances",
        "data": [
          2,
          2,
          3,
          5,
          5,
          4,
          6,
          8,
          8,
          6,
          5
        ]
      }
    ],
    "grid": {
      "padding": {
        "top": -20,
        "right": 0,
        "left": -4,
        "bottom": -4
      },
      "strokeDashArray": 4
    },
    "xaxis": {
      "labels": {
        "padding": 0
      },
      "tooltip": {
        "enabled": false
      },
      "categories": [
        "00:00",
        "02:00",
        "04:00",
        "06:00",
        "08:00",
        "10:00",
        "12:00",
        "14:00",
        "16:00",
        "18:00",
        "20:00"
      ]
    },
    "yaxis": {
      "labels": {
        "padding": 4
      }
    },
    "colors": [
      "#066fd1"
    ],
    "legend": {
      "show": false
    }
  },
  "chart-completion-tasks-3": {
    "chart": {
      "id": "completion-tasks-3",
      "type": "area",
      "fontFamily": "inherit",
      "height": 240,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": false
      },
      "animations": {
        "enabled": false
      }
    },
    "dataLabels": {
      "enabled": false
    },
    "fill": {
      "colors": [
        "#066fd1"
      ],
      "type": "solid"
    },
    "stroke": {
      "width": 2,
      "lineCap": "round",
      "curve": "smooth"
    },
    "series": [
      {
        "name": "Tickets solved",
        "data": [
          38,
          44,
          41,
          52,
          47,
          21,
          17
        ]
      }
    ],
    "grid": {
      "padding": {
        "top": -20,
        "right": 0,
        "left": -4,
        "bottom": -4
      },
      "strokeDashArray": 4
    },
    "xaxis": {
      "labels": {
        "padding": 0
      },
      "tooltip": {
        "enabled": false
      },
      "axisBorder": {
        "show": false
      },
      "categories": [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
      ]
    },
    "yaxis": {
      "labels": {
        "padding": 4
      }
    },
    "colors": [
      "#066fd1"
    ],
    "legend": {
      "show": false
    }
  },
  "chart-completion-tasks-10": {
    "chart": {
      "id": "completion-tasks-10",
      "type": "area",
      "fontFamily": "inherit",
      "height": 240,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": false
      },
      "animations": {
        "enabled": false
      }
    },
    "dataLabels": {
      "enabled": false
    },
    "fill": {
      "colors": [
        "#066fd1",
        "#066fd1"
      ],
      "type": "solid"
    },
    "stroke": {
      "width": 2,
      "lineCap": "round",
      "curve": "smooth"
    },
    "series": [
      {
        "name": "Solved",
        "data": [
          38,
          44,
          41,
          52,
          47,
          21,
          17
        ]
      },
      {
        "name": "Reopened",
        "data": [
          5,
          7,
          4,
          9,
          6,
          3,
          2
        ]
      }
    ],
    "grid": {
      "padding": {
        "top": -20,
        "right": 0,
        "left": -4,
        "bottom": -4
      },
      "strokeDashArray": 4
    },
    "xaxis": {
      "labels": {
        "padding": 0
      },
      "tooltip": {
        "enabled": false
      },
      "axisBorder": {
        "show": false
      },
      "categories": [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
      ]
    },
    "yaxis": {
      "labels": {
        "padding": 4
      }
    },
    "colors": [
      "#066fd1",
      "#066fd1"
    ],
    "legend": {
      "show": false
    }
  },
  "chart-completion-tasks-11": {
    "chart": {
      "id": "completion-tasks-11",
      "type": "area",
      "fontFamily": "inherit",
      "height": 240,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": false
      },
      "animations": {
        "enabled": false
      },
      "stacked": true
    },
    "dataLabels": {
      "enabled": false
    },
    "fill": {
      "colors": [
        "#066fd1",
        "#066fd1"
      ],
      "type": "solid"
    },
    "stroke": {
      "width": 2,
      "lineCap": "round",
      "curve": "smooth"
    },
    "series": [
      {
        "name": "Solved",
        "data": [
          38,
          44,
          41,
          52,
          47,
          21,
          17
        ]
      },
      {
        "name": "Reopened",
        "data": [
          5,
          7,
          4,
          9,
          6,
          3,
          2
        ]
      }
    ],
    "grid": {
      "padding": {
        "top": -20,
        "right": 0,
        "left": -4,
        "bottom": -4
      },
      "strokeDashArray": 4
    },
    "xaxis": {
      "labels": {
        "padding": 0
      },
      "tooltip": {
        "enabled": false
      },
      "axisBorder": {
        "show": false
      },
      "categories": [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
      ]
    },
    "yaxis": {
      "labels": {
        "padding": 4
      }
    },
    "colors": [
      "#066fd1",
      "#066fd1"
    ],
    "legend": {
      "show": false
    }
  },
  "chart-area": {
    "chart": {
      "id": "area",
      "type": "area",
      "fontFamily": "inherit",
      "height": 240,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": false
      },
      "animations": {
        "enabled": false
      }
    },
    "dataLabels": {
      "enabled": false
    },
    "fill": {
      "colors": [
        "#066fd1",
        "#066fd1"
      ],
      "type": "solid"
    },
    "stroke": {
      "width": 2,
      "lineCap": "round",
      "curve": "straight"
    },
    "series": [
      {
        "name": "Mobile",
        "data": [
          5100,
          5400,
          5900,
          6300,
          6800,
          7200
        ]
      },
      {
        "name": "Desktop",
        "data": [
          4200,
          4100,
          3900,
          4000,
          3800,
          3700
        ]
      }
    ],
    "grid": {
      "padding": {
        "top": -20,
        "right": 0,
        "left": -4,
        "bottom": -4
      },
      "strokeDashArray": 4
    },
    "xaxis": {
      "labels": {
        "padding": 0
      },
      "tooltip": {
        "enabled": false
      },
      "axisBorder": {
        "show": false
      },
      "categories": [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun"
      ]
    },
    "yaxis": {
      "labels": {
        "padding": 4
      }
    },
    "colors": [
      "#066fd1",
      "#066fd1"
    ],
    "legend": {
      "show": false
    }
  },
  "chart-area-spline": {
    "chart": {
      "id": "area-spline",
      "type": "area",
      "fontFamily": "inherit",
      "height": 240,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": false
      },
      "animations": {
        "enabled": false
      }
    },
    "dataLabels": {
      "enabled": false
    },
    "fill": {
      "colors": [
        "#066fd1",
        "#066fd1"
      ],
      "type": "solid"
    },
    "stroke": {
      "width": 2,
      "lineCap": "round",
      "curve": "smooth"
    },
    "series": [
      {
        "name": "Egress",
        "data": [
          12,
          15,
          14,
          18,
          21,
          24
        ]
      },
      {
        "name": "Ingress",
        "data": [
          7,
          8,
          9,
          9,
          11,
          13
        ]
      }
    ],
    "grid": {
      "padding": {
        "top": -20,
        "right": 0,
        "left": -4,
        "bottom": -4
      },
      "strokeDashArray": 4
    },
    "xaxis": {
      "labels": {
        "padding": 0
      },
      "tooltip": {
        "enabled": false
      },
      "axisBorder": {
        "show": false
      },
      "categories": [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun"
      ]
    },
    "yaxis": {
      "labels": {
        "padding": 4
      }
    },
    "colors": [
      "#066fd1",
      "#066fd1"
    ],
    "legend": {
      "show": false
    }
  },
  "chart-area-spline-stacked": {
    "chart": {
      "id": "area-spline-stacked",
      "type": "area",
      "fontFamily": "inherit",
      "height": 240,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": false
      },
      "animations": {
        "enabled": false
      },
      "stacked": true
    },
    "dataLabels": {
      "enabled": false
    },
    "fill": {
      "colors": [
        "#066fd1",
        "#066fd1"
      ],
      "type": "solid"
    },
    "stroke": {
      "width": 2,
      "lineCap": "round",
      "curve": "smooth"
    },
    "series": [
      {
        "name": "Media",
        "data": [
          140,
          152,
          161,
          170,
          182,
          195
        ]
      },
      {
        "name": "Backups",
        "data": [
          90,
          95,
          101,
          110,
          118,
          126
        ]
      }
    ],
    "grid": {
      "padding": {
        "top": -20,
        "right": 0,
        "left": -4,
        "bottom": -4
      },
      "strokeDashArray": 4
    },
    "xaxis": {
      "labels": {
        "padding": 0
      },
      "tooltip": {
        "enabled": false
      },
      "axisBorder": {
        "show": false
      },
      "categories": [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun"
      ]
    },
    "yaxis": {
      "labels": {
        "padding": 4
      }
    },
    "colors": [
      "#066fd1",
      "#066fd1"
    ],
    "legend": {
      "show": false
    }
  },
  "chart-completion-tasks": {
    "chart": {
      "id": "completion-tasks",
      "type": "bar",
      "fontFamily": "inherit",
      "height": 240,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": false
      },
      "animations": {
        "enabled": false
      }
    },
    "plotOptions": {
      "bar": {
        "columnWidth": "50%"
      }
    },
    "dataLabels": {
      "enabled": false
    },
    "series": [
      {
        "name": "Tickets solved",
        "data": [
          38,
          44,
          41,
          52,
          47,
          21,
          17
        ]
      }
    ],
    "grid": {
      "padding": {
        "top": -20,
        "right": 0,
        "left": -4,
        "bottom": -4
      },
      "strokeDashArray": 4
    },
    "xaxis": {
      "labels": {
        "padding": 0
      },
      "tooltip": {
        "enabled": false
      },
      "axisBorder": {
        "show": false
      },
      "categories": [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
      ]
    },
    "yaxis": {
      "labels": {
        "padding": 4
      }
    },
    "colors": [
      "#066fd1"
    ],
    "legend": {
      "show": false
    }
  },
  "chart-completion-tasks-6": {
    "chart": {
      "id": "completion-tasks-6",
      "type": "bar",
      "fontFamily": "inherit",
      "height": 240,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": false
      },
      "animations": {
        "enabled": false
      }
    },
    "plotOptions": {
      "bar": {
        "barHeight": "50%",
        "horizontal": true
      }
    },
    "dataLabels": {
      "enabled": false
    },
    "series": [
      {
        "name": "Tickets solved",
        "data": [
          38,
          44,
          41,
          52,
          47,
          21,
          17
        ]
      }
    ],
    "grid": {
      "padding": {
        "top": -20,
        "right": 0,
        "left": -4,
        "bottom": -4
      },
      "strokeDashArray": 4
    },
    "xaxis": {
      "labels": {
        "padding": 0
      },
      "tooltip": {
        "enabled": false
      },
      "axisBorder": {
        "show": false
      },
      "categories": [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
      ]
    },
    "yaxis": {
      "labels": {
        "padding": 4
      }
    },
    "colors": [
      "#066fd1"
    ],
    "legend": {
      "show": false
    }
  },
  "chart-completion-tasks-8": {
    "chart": {
      "id": "completion-tasks-8",
      "type": "bar",
      "fontFamily": "inherit",
      "height": 240,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": false
      },
      "animations": {
        "enabled": false
      }
    },
    "plotOptions": {
      "bar": {
        "columnWidth": "50%"
      }
    },
    "dataLabels": {
      "enabled": false
    },
    "series": [
      {
        "name": "Solved",
        "data": [
          38,
          44,
          41,
          52,
          47,
          21,
          17
        ]
      },
      {
        "name": "Reopened",
        "data": [
          5,
          7,
          4,
          9,
          6,
          3,
          2
        ]
      }
    ],
    "grid": {
      "padding": {
        "top": -20,
        "right": 0,
        "left": -4,
        "bottom": -4
      },
      "strokeDashArray": 4
    },
    "xaxis": {
      "labels": {
        "padding": 0
      },
      "tooltip": {
        "enabled": false
      },
      "axisBorder": {
        "show": false
      },
      "categories": [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
      ]
    },
    "yaxis": {
      "labels": {
        "padding": 4
      }
    },
    "colors": [
      "#066fd1",
      "#066fd1"
    ],
    "legend": {
      "show": false
    }
  },
  "chart-completion-tasks-9": {
    "chart": {
      "id": "completion-tasks-9",
      "type": "bar",
      "fontFamily": "inherit",
      "height": 240,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": false
      },
      "animations": {
        "enabled": false
      },
      "stacked": true
    },
    "plotOptions": {
      "bar": {
        "columnWidth": "50%"
      }
    },
    "dataLabels": {
      "enabled": false
    },
    "series": [
      {
        "name": "Solved",
        "data": [
          38,
          44,
          41,
          52,
          47,
          21,
          17
        ]
      },
      {
        "name": "Reopened",
        "data": [
          5,
          7,
          4,
          9,
          6,
          3,
          2
        ]
      }
    ],
    "grid": {
      "padding": {
        "top": -20,
        "right": 0,
        "left": -4,
        "bottom": -4
      },
      "strokeDashArray": 4
    },
    "xaxis": {
      "labels": {
        "padding": 0
      },
      "tooltip": {
        "enabled": false
      },
      "axisBorder": {
        "show": false
      },
      "categories": [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
      ]
    },
    "yaxis": {
      "labels": {
        "padding": 4
      }
    },
    "colors": [
      "#066fd1",
      "#066fd1"
    ],
    "legend": {
      "show": false
    }
  },
  "chart-cache-status": {
    "chart": {
      "id": "cache-status",
      "type": "bar",
      "fontFamily": "inherit",
      "height": 240,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": false
      },
      "animations": {
        "enabled": false
      },
      "stacked": true
    },
    "plotOptions": {
      "bar": {
        "columnWidth": "50%"
      }
    },
    "dataLabels": {
      "enabled": false
    },
    "series": [
      {
        "name": "Hit",
        "data": [
          18000,
          19200,
          21000,
          20300,
          22000,
          16600,
          15000
        ]
      },
      {
        "name": "Error",
        "data": [
          4300,
          4700,
          5000,
          5000,
          5300,
          4000,
          3700
        ]
      },
      {
        "name": "Revalidated",
        "data": [
          2700,
          3000,
          3200,
          3100,
          3400,
          2500,
          2300
        ]
      },
      {
        "name": "Expired",
        "data": [
          1300,
          1500,
          1600,
          1600,
          1700,
          1200,
          1100
        ]
      },
      {
        "name": "Bypass",
        "data": [
          700,
          800,
          900,
          800,
          900,
          700,
          600
        ]
      }
    ],
    "grid": {
      "padding": {
        "top": -20,
        "right": 0,
        "left": -4,
        "bottom": -4
      },
      "strokeDashArray": 4
    },
    "xaxis": {
      "labels": {
        "padding": 0
      },
      "tooltip": {
        "enabled": false
      },
      "axisBorder": {
        "show": false
      },
      "categories": [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
      ]
    },
    "yaxis": {
      "labels": {
        "padding": 4
      }
    },
    "colors": [
      "#066fd1",
      "#066fd1",
      "#066fd1",
      "#066fd1",
      "#066fd1"
    ],
    "legend": {
      "show": true,
      "position": "bottom",
      "offsetY": 12,
      "markers": {
        "size": 5,
        "strokeWidth": 0,
        "shape": "circle"
      },
      "itemMargin": {
        "horizontal": 8,
        "vertical": 8
      }
    }
  },
  "chart-funnel": {
    "chart": {
      "id": "funnel",
      "type": "bar",
      "fontFamily": "inherit",
      "height": 240,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": false
      },
      "animations": {
        "enabled": false
      }
    },
    "plotOptions": {
      "bar": {
        "horizontal": true,
        "barHeight": "80%",
        "isFunnel": true,
        "isFunnel3d": false,
        "distributed": true
      }
    },
    "dataLabels": {
      "enabled": true
    },
    "series": [
      {
        "name": "Pipeline",
        "data": [
          1380,
          920,
          610,
          380,
          190
        ]
      }
    ],
    "grid": {
      "strokeDashArray": 4
    },
    "xaxis": {
      "labels": {
        "padding": 0
      },
      "tooltip": {
        "enabled": false
      },
      "axisBorder": {
        "show": false
      },
      "categories": [
        "Visitors",
        "Sign-ups",
        "Trials",
        "Demos",
        "Customers"
      ]
    },
    "yaxis": {
      "labels": {
        "padding": 4
      }
    },
    "colors": [
      "#066fd1",
      "#4299e1",
      "#17a2b8",
      "#0ca678",
      "#2fb344"
    ],
    "legend": {
      "show": true,
      "position": "bottom",
      "offsetY": 12,
      "markers": {
        "size": 5,
        "strokeWidth": 0,
        "shape": "circle"
      },
      "itemMargin": {
        "horizontal": 8,
        "vertical": 8
      }
    }
  },
  "chart-demo-pie": {
    "chart": {
      "id": "demo-pie",
      "type": "donut",
      "fontFamily": "inherit",
      "height": 240,
      "sparkline": {
        "enabled": true
      },
      "animations": {
        "enabled": false
      }
    },
    "series": [
      46,
      38,
      19,
      11
    ],
    "labels": [
      "Organic search",
      "Direct",
      "Referral",
      "Social"
    ],
    "grid": {
      "strokeDashArray": 4
    },
    "colors": [
      "#066fd1",
      "#066fd1",
      "#066fd1",
      "#066fd1"
    ],
    "legend": {
      "show": true,
      "position": "bottom",
      "offsetY": 12,
      "markers": {
        "size": 5,
        "strokeWidth": 0,
        "shape": "circle"
      },
      "itemMargin": {
        "horizontal": 8,
        "vertical": 8
      }
    },
    "tooltip": {
      "fillSeriesColor": false
    }
  },
  "chart-campaigns": {
    "chart": {
      "id": "campaigns",
      "type": "radialBar",
      "fontFamily": "inherit",
      "height": 240,
      "sparkline": {
        "enabled": true
      },
      "animations": {
        "enabled": false
      }
    },
    "plotOptions": {
      "radialBar": {
        "startAngle": -120,
        "endAngle": 120,
        "hollow": {
          "margin": 16,
          "size": "50%"
        },
        "dataLabels": {
          "show": true,
          "name": {
            "show": false,
            "offsetY": 0,
            "fontSize": "16px",
            "color": "inherit"
          },
          "value": {
            "offsetY": -8,
            "fontSize": "24px",
            "fontWeight": 600
          }
        }
      }
    },
    "series": [
      96,
      48,
      14
    ],
    "labels": [
      "Delivered",
      "Opened",
      "Clicked"
    ],
    "grid": {
      "strokeDashArray": 4
    },
    "colors": [
      "#066fd1",
      "#066fd1",
      "#066fd1"
    ],
    "legend": {
      "show": true,
      "position": "bottom",
      "offsetY": 12,
      "markers": {
        "size": 5,
        "strokeWidth": 0,
        "shape": "circle"
      },
      "itemMargin": {
        "horizontal": 8,
        "vertical": 8
      }
    }
  },
  "chart-polar-area": {
    "chart": {
      "id": "polar-area",
      "type": "polarArea",
      "fontFamily": "inherit",
      "height": 240,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": false
      },
      "animations": {
        "enabled": false
      }
    },
    "plotOptions": {
      "polarArea": {
        "rings": {
          "strokeColor": "var(--apx-grid)"
        },
        "spokes": {
          "connectorColors": "var(--apx-grid)"
        }
      }
    },
    "series": [
      42,
      33,
      21,
      14,
      9
    ],
    "labels": [
      "North America",
      "Europe",
      "Asia",
      "South America",
      "Africa"
    ],
    "grid": {
      "strokeDashArray": 4
    },
    "colors": [
      "#066fd1",
      "#066fd1",
      "#066fd1",
      "#066fd1",
      "#066fd1"
    ],
    "legend": {
      "show": true,
      "position": "bottom",
      "offsetY": 12,
      "markers": {
        "size": 5,
        "strokeWidth": 0,
        "shape": "circle"
      },
      "itemMargin": {
        "horizontal": 8,
        "vertical": 8
      }
    }
  },
  "chart-combination": {
    "chart": {
      "id": "combination",
      "type": "line",
      "fontFamily": "inherit",
      "height": 240,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": false
      },
      "animations": {
        "enabled": false
      }
    },
    "stroke": {
      "width": [
        0,
        0,
        2,
        2
      ],
      "lineCap": "round",
      "curve": "smooth"
    },
    "series": [
      {
        "name": "Paid spend",
        "type": "column",
        "data": [
          120,
          140,
          130,
          160,
          175,
          190
        ]
      },
      {
        "name": "Content spend",
        "type": "column",
        "data": [
          60,
          70,
          65,
          80,
          90,
          100
        ]
      },
      {
        "name": "Leads",
        "type": "line",
        "data": [
          200,
          230,
          215,
          260,
          290,
          310
        ]
      },
      {
        "name": "Trials",
        "type": "line",
        "data": [
          90,
          105,
          98,
          120,
          135,
          150
        ]
      }
    ],
    "grid": {
      "padding": {
        "top": -20,
        "right": 0,
        "left": -4,
        "bottom": -4
      },
      "strokeDashArray": 4
    },
    "xaxis": {
      "labels": {
        "padding": 0
      },
      "tooltip": {
        "enabled": false
      },
      "categories": [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun"
      ]
    },
    "yaxis": {
      "labels": {
        "padding": 4
      }
    },
    "colors": [
      "#066fd1",
      "#066fd1",
      "#066fd1",
      "#066fd1"
    ],
    "legend": {
      "show": false
    }
  },
  "chart-radar": {
    "chart": {
      "id": "radar",
      "type": "radar",
      "fontFamily": "inherit",
      "height": 240,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": false
      },
      "animations": {
        "enabled": false
      }
    },
    "plotOptions": {
      "radar": {
        "polygons": {
          "strokeColors": "var(--apx-grid)",
          "connectorColors": "var(--apx-grid)",
          "fill": {
            "colors": [
              "transparent",
              "transparent"
            ]
          }
        }
      }
    },
    "markers": {
      "size": 3
    },
    "fill": {
      "opacity": 0.15
    },
    "series": [
      {
        "name": "Pro",
        "data": [
          70,
          60,
          80,
          50,
          65,
          90
        ]
      },
      {
        "name": "Enterprise",
        "data": [
          95,
          90,
          85,
          100,
          90,
          40
        ]
      }
    ],
    "grid": {
      "strokeDashArray": 4
    },
    "xaxis": {
      "labels": {
        "padding": 0
      },
      "tooltip": {
        "enabled": false
      },
      "categories": [
        "Support",
        "Security",
        "Speed",
        "Storage",
        "Integrations",
        "Price"
      ]
    },
    "yaxis": {
      "show": false
    },
    "colors": [
      "#066fd1",
      "#066fd1"
    ],
    "legend": {
      "show": true,
      "position": "bottom",
      "offsetY": 12,
      "markers": {
        "size": 5,
        "strokeWidth": 0,
        "shape": "circle"
      },
      "itemMargin": {
        "horizontal": 8,
        "vertical": 8
      }
    }
  },
  "chart-scatter": {
    "chart": {
      "id": "scatter",
      "type": "scatter",
      "fontFamily": "inherit",
      "height": 240,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": false
      },
      "animations": {
        "enabled": false
      }
    },
    "series": [
      {
        "name": "Desktop",
        "data": [
          1.8,
          1.9,
          1.6,
          1.5,
          1.4,
          1.3
        ]
      },
      {
        "name": "Mobile",
        "data": [
          3.4,
          3.2,
          3.3,
          2.9,
          2.8,
          2.6
        ]
      }
    ],
    "grid": {
      "padding": {
        "top": -20,
        "right": 0,
        "left": -4,
        "bottom": -4
      },
      "strokeDashArray": 4
    },
    "xaxis": {
      "labels": {
        "padding": 0
      },
      "tooltip": {
        "enabled": false
      },
      "categories": [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun"
      ]
    },
    "yaxis": {
      "labels": {
        "padding": 4
      }
    },
    "colors": [
      "#066fd1",
      "#066fd1"
    ],
    "legend": {
      "show": false
    }
  },
  "chart-timeline": {
    "chart": {
      "id": "timeline",
      "type": "rangeBar",
      "fontFamily": "inherit",
      "height": 240,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": false
      },
      "animations": {
        "enabled": false
      }
    },
    "plotOptions": {
      "bar": {
        "barHeight": "50%",
        "horizontal": true
      }
    },
    "series": [
      {
        "name": "Roadmap",
        "data": [
          {
            "x": "Research",
            "y": [
              1767571200000,
              1770681600000
            ]
          },
          {
            "x": "Design",
            "y": [
              1769904000000,
              1773532800000
            ]
          },
          {
            "x": "Development",
            "y": [
              1772323200000,
              1779235200000
            ]
          },
          {
            "x": "Testing",
            "y": [
              1777593600000,
              1781049600000
            ]
          },
          {
            "x": "Launch",
            "y": [
              1780272000000,
              1782345600000
            ]
          }
        ]
      }
    ],
    "grid": {
      "padding": {
        "top": -20,
        "right": 0,
        "left": -4,
        "bottom": -4
      },
      "strokeDashArray": 4
    },
    "xaxis": {
      "labels": {
        "padding": 0
      },
      "tooltip": {
        "enabled": false
      },
      "type": "datetime"
    },
    "yaxis": {
      "labels": {
        "padding": 4
      }
    },
    "labels": [],
    "colors": [
      "#066fd1"
    ],
    "legend": {
      "show": false
    }
  },
  "chart-bubble": {
    "chart": {
      "id": "bubble",
      "type": "bubble",
      "fontFamily": "inherit",
      "height": 240,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": false
      },
      "animations": {
        "enabled": false
      }
    },
    "fill": {
      "opacity": 0.8
    },
    "dataLabels": {
      "enabled": false
    },
    "series": [
      {
        "name": "Search",
        "data": [
          {
            "x": 12,
            "y": 86,
            "z": 24
          },
          {
            "x": 28,
            "y": 132,
            "z": 38
          },
          {
            "x": 45,
            "y": 118,
            "z": 19
          },
          {
            "x": 63,
            "y": 174,
            "z": 31
          }
        ]
      },
      {
        "name": "Social",
        "data": [
          {
            "x": 9,
            "y": 54,
            "z": 29
          },
          {
            "x": 21,
            "y": 71,
            "z": 14
          },
          {
            "x": 38,
            "y": 96,
            "z": 41
          },
          {
            "x": 52,
            "y": 83,
            "z": 22
          }
        ]
      }
    ],
    "grid": {
      "padding": {
        "top": -20,
        "right": 0,
        "left": -4,
        "bottom": -4
      },
      "strokeDashArray": 4
    },
    "xaxis": {
      "labels": {
        "padding": 0
      },
      "tooltip": {
        "enabled": false
      }
    },
    "yaxis": {
      "labels": {
        "padding": 4
      }
    },
    "colors": [
      "#066fd1",
      "#066fd1"
    ],
    "legend": {
      "show": false
    }
  },
  "chart-treemap": {
    "chart": {
      "id": "treemap",
      "type": "treemap",
      "fontFamily": "inherit",
      "height": 240,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": false
      },
      "animations": {
        "enabled": false
      }
    },
    "plotOptions": {
      "treemap": {
        "distributed": false,
        "enableShades": true,
        "shadeIntensity": 0.4
      }
    },
    "dataLabels": {
      "enabled": true
    },
    "series": [
      {
        "name": "Storage",
        "data": [
          {
            "x": "Documents",
            "y": 218
          },
          {
            "x": "Photos",
            "y": 149
          },
          {
            "x": "Videos",
            "y": 184
          },
          {
            "x": "Backups",
            "y": 55
          },
          {
            "x": "Music",
            "y": 84
          },
          {
            "x": "Archives",
            "y": 31
          },
          {
            "x": "Other",
            "y": 70
          }
        ]
      }
    ],
    "grid": {
      "strokeDashArray": 4
    },
    "yaxis": {
      "labels": {
        "padding": 4
      }
    },
    "colors": [
      "#066fd1"
    ],
    "legend": {
      "show": false
    }
  },
  "chart-box-plot": {
    "chart": {
      "id": "box-plot",
      "type": "boxPlot",
      "fontFamily": "inherit",
      "height": 240,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": false
      },
      "animations": {
        "enabled": false
      }
    },
    "plotOptions": {
      "boxPlot": {
        "colors": {
          "upper": "#066fd1",
          "lower": "#066fd1"
        }
      }
    },
    "stroke": {
      "colors": [
        "#667382"
      ]
    },
    "series": [
      {
        "name": "Response time",
        "data": [
          {
            "x": "Jan",
            "y": [
              54,
              66,
              69,
              75,
              88
            ]
          },
          {
            "x": "Feb",
            "y": [
              43,
              65,
              69,
              76,
              81
            ]
          },
          {
            "x": "Mar",
            "y": [
              31,
              39,
              45,
              51,
              59
            ]
          },
          {
            "x": "Apr",
            "y": [
              39,
              46,
              55,
              65,
              71
            ]
          },
          {
            "x": "May",
            "y": [
              29,
              31,
              35,
              39,
              44
            ]
          },
          {
            "x": "Jun",
            "y": [
              41,
              49,
              58,
              61,
              67
            ]
          }
        ]
      }
    ],
    "grid": {
      "padding": {
        "top": -20,
        "right": 0,
        "left": -4,
        "bottom": -4
      },
      "strokeDashArray": 4
    },
    "xaxis": {
      "labels": {
        "padding": 0
      },
      "tooltip": {
        "enabled": false
      }
    },
    "yaxis": {
      "labels": {
        "padding": 4
      }
    },
    "colors": [
      "#066fd1"
    ],
    "legend": {
      "show": false
    }
  }
};
