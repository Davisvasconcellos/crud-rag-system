export interface AdvancedCardMeta {
  id: string;
  title: string;
  description: string;
  charts: { id: string; height: number }[];
}

export const ADVANCED_CARDS_LIST: AdvancedCardMeta[] = [
  {
    "id": "two-y-axes",
    "title": "Two y-axes",
    "description": "Multi-axis chart comparing Revenue ($) and Order volume on dual synchronized scales.",
    "charts": [
      {
        "id": "chart-revenue-vs-orders",
        "height": 256
      }
    ]
  },
  {
    "id": "threshold-line",
    "title": "Threshold line",
    "description": "Uptime percentage tracking with 99.9% SLA target threshold annotation line.",
    "charts": [
      {
        "id": "chart-uptime-sla",
        "height": 256
      }
    ]
  },
  {
    "id": "marker-lines",
    "title": "Marker lines",
    "description": "Sales timeline with vertical marker annotations highlighting software releases (v1.0, v2.0, promo).",
    "charts": [
      {
        "id": "chart-sales-with-markers",
        "height": 256
      }
    ]
  },
  {
    "id": "brush-and-zoom",
    "title": "Brush and zoom",
    "description": "Two connected charts where the bottom mini-chart controls the zoom and pan window of the top chart.",
    "charts": [
      {
        "id": "chart-traffic-zoom",
        "height": 176
      },
      {
        "id": "chart-traffic-brush",
        "height": 80
      }
    ]
  },
  {
    "id": "synced-charts",
    "title": "Synced charts",
    "description": "Three independent charts (Visits area, Signups line, Revenue bar) with synchronized crosshair cursor.",
    "charts": [
      {
        "id": "chart-synced-visits",
        "height": 128
      },
      {
        "id": "chart-synced-signups",
        "height": 128
      },
      {
        "id": "chart-synced-revenue",
        "height": 128
      }
    ]
  }
];

export const TABLER_ADVANCED_CONFIGS: Record<string, any> = {
  "chart-revenue-vs-orders": {
    "chart": {
      "id": "revenue-vs-orders",
      "type": "line",
      "fontFamily": "inherit",
      "height": 256,
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
        2
      ],
      "lineCap": "round",
      "curve": "smooth"
    },
    "series": [
      {
        "name": "Revenue",
        "type": "column",
        "data": [
          12400,
          14100,
          13200,
          16800,
          18300,
          17600,
          19400,
          21200,
          20100,
          23400,
          25100,
          27800
        ]
      },
      {
        "name": "Orders",
        "type": "line",
        "data": [
          186,
          204,
          197,
          242,
          261,
          253,
          274,
          298,
          286,
          321,
          340,
          372
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
    "yaxis": [
      {
        "seriesName": "Revenue",
        "title": {
          "text": "Revenue ($)",
          "offsetX": -8,
          "style": {
            "fontSize": "11px",
            "fontWeight": 500,
            "fontFamily": "inherit"
          }
        },
        "labels": {
          "padding": 4
        }
      },
      {
        "seriesName": "Orders",
        "opposite": true,
        "title": {
          "text": "Orders",
          "offsetX": 8,
          "style": {
            "fontSize": "11px",
            "fontWeight": 500,
            "fontFamily": "inherit"
          }
        },
        "labels": {
          "padding": 4
        }
      }
    ],
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
  "chart-uptime-sla": {
    "chart": {
      "id": "uptime-sla",
      "type": "line",
      "fontFamily": "inherit",
      "height": 256,
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
        "name": "Uptime",
        "data": [
          99.98,
          99.95,
          99.87,
          99.99,
          100,
          99.92,
          99.76,
          99.94,
          99.97,
          99.99,
          99.91,
          99.96
        ]
      }
    ],
    "annotations": {
      "yaxis": [
        {
          "y": 99.9,
          "strokeDashArray": 4,
          "borderColor": "#d63939",
          "label": {
            "text": "SLA 99.9%",
            "borderWidth": 0,
            "position": "left",
            "textAnchor": "start",
            "offsetX": 8,
            "style": {
              "background": "#d63939",
              "color": "#066fd1",
              "fontSize": "11px",
              "fontFamily": "inherit"
            }
          }
        }
      ]
    },
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
    "yaxis": [
      {
        "min": 99,
        "max": 100,
        "title": {
          "text": "Uptime (%)",
          "offsetX": -8,
          "style": {
            "fontSize": "11px",
            "fontWeight": 500,
            "fontFamily": "inherit"
          }
        },
        "labels": {
          "padding": 4
        }
      }
    ],
    "colors": [
      "#066fd1"
    ],
    "legend": {
      "show": false
    },
    "markers": {
      "size": 2
    }
  },
  "chart-sales-with-markers": {
    "chart": {
      "id": "sales-with-markers",
      "type": "area",
      "fontFamily": "inherit",
      "height": 256,
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
        "name": "Sales",
        "data": [
          128,
          141,
          137,
          189,
          232,
          214,
          198,
          205,
          264,
          301,
          288,
          312
        ]
      }
    ],
    "annotations": {
      "xaxis": [
        {
          "x": "Apr",
          "strokeDashArray": 4,
          "borderColor": "#4299e1",
          "label": {
            "text": "Spring campaign",
            "borderWidth": 0,
            "position": "top",
            "textAnchor": "middle",
            "offsetX": 0,
            "style": {
              "background": "#4299e1",
              "color": "#066fd1",
              "fontSize": "11px",
              "fontFamily": "inherit"
            }
          }
        },
        {
          "x": "Sep",
          "strokeDashArray": 4,
          "borderColor": "#ae3ec9",
          "label": {
            "text": "Relaunch",
            "borderWidth": 0,
            "position": "top",
            "textAnchor": "middle",
            "offsetX": 0,
            "style": {
              "background": "#ae3ec9",
              "color": "#066fd1",
              "fontSize": "11px",
              "fontFamily": "inherit"
            }
          }
        }
      ]
    },
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
      "#066fd1"
    ],
    "legend": {
      "show": false
    }
  },
  "chart-traffic-zoom": {
    "chart": {
      "id": "traffic-zoom",
      "type": "area",
      "fontFamily": "inherit",
      "height": 176,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": true
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
        "name": "Sessions",
        "data": [
          1847,
          1768,
          1792,
          2003,
          2081,
          2099,
          2261,
          2441,
          2268,
          2483,
          2367,
          2245,
          2458,
          2278,
          2236,
          2044,
          1871,
          1950,
          2134,
          2270,
          2377,
          2200,
          2255,
          2260,
          2141,
          2312,
          2137,
          2270,
          2128,
          1935,
          2032,
          2138,
          2297,
          2436,
          2583,
          2691,
          2502,
          2441,
          2300,
          2373,
          2329,
          2251,
          2379,
          2307,
          2470,
          2500,
          2380,
          2370,
          2408,
          2378,
          2299,
          2448,
          2496,
          2441,
          2538,
          2581,
          2544,
          2581,
          2477,
          2309,
          2354,
          2370,
          2357,
          2277,
          2263,
          2092,
          2212,
          2093,
          1940,
          2093,
          2143,
          2198,
          2385,
          2286,
          2284,
          2245,
          2306,
          2388,
          2281,
          2158,
          2213,
          2009,
          1924,
          2047,
          2164,
          2142,
          2092,
          2102,
          2005,
          1923
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
      "type": "datetime"
    },
    "yaxis": {
      "labels": {
        "padding": 4
      }
    },
    "labels": [
      "2026-01-01",
      "2026-01-02",
      "2026-01-03",
      "2026-01-04",
      "2026-01-05",
      "2026-01-06",
      "2026-01-07",
      "2026-01-08",
      "2026-01-09",
      "2026-01-10",
      "2026-01-11",
      "2026-01-12",
      "2026-01-13",
      "2026-01-14",
      "2026-01-15",
      "2026-01-16",
      "2026-01-17",
      "2026-01-18",
      "2026-01-19",
      "2026-01-20",
      "2026-01-21",
      "2026-01-22",
      "2026-01-23",
      "2026-01-24",
      "2026-01-25",
      "2026-01-26",
      "2026-01-27",
      "2026-01-28",
      "2026-01-29",
      "2026-01-30",
      "2026-01-31",
      "2026-02-01",
      "2026-02-02",
      "2026-02-03",
      "2026-02-04",
      "2026-02-05",
      "2026-02-06",
      "2026-02-07",
      "2026-02-08",
      "2026-02-09",
      "2026-02-10",
      "2026-02-11",
      "2026-02-12",
      "2026-02-13",
      "2026-02-14",
      "2026-02-15",
      "2026-02-16",
      "2026-02-17",
      "2026-02-18",
      "2026-02-19",
      "2026-02-20",
      "2026-02-21",
      "2026-02-22",
      "2026-02-23",
      "2026-02-24",
      "2026-02-25",
      "2026-02-26",
      "2026-02-27",
      "2026-02-28",
      "2026-03-01",
      "2026-03-02",
      "2026-03-03",
      "2026-03-04",
      "2026-03-05",
      "2026-03-06",
      "2026-03-07",
      "2026-03-08",
      "2026-03-09",
      "2026-03-10",
      "2026-03-11",
      "2026-03-12",
      "2026-03-13",
      "2026-03-14",
      "2026-03-15",
      "2026-03-16",
      "2026-03-17",
      "2026-03-18",
      "2026-03-19",
      "2026-03-20",
      "2026-03-21",
      "2026-03-22",
      "2026-03-23",
      "2026-03-24",
      "2026-03-25",
      "2026-03-26",
      "2026-03-27",
      "2026-03-28",
      "2026-03-29",
      "2026-03-30",
      "2026-03-31"
    ],
    "colors": [
      "#066fd1"
    ],
    "legend": {
      "show": false
    }
  },
  "chart-traffic-brush": {
    "chart": {
      "id": "traffic-brush",
      "type": "line",
      "fontFamily": "inherit",
      "height": 80,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": false
      },
      "animations": {
        "enabled": false
      },
      "brush": {
        "enabled": true,
        "target": "traffic-zoom"
      },
      "selection": {
        "enabled": true,
        "xaxis": {
          "min": 1770681600000,
          "max": 1773273600000
        },
        "fill": {
          "color": "#066fd1",
          "opacity": 0.16
        },
        "stroke": {
          "color": "#066fd1",
          "width": 1,
          "opacity": 1,
          "dashArray": 0
        }
      }
    },
    "stroke": {
      "width": 2,
      "lineCap": "round",
      "curve": "smooth"
    },
    "series": [
      {
        "name": "Sessions",
        "data": [
          1847,
          1768,
          1792,
          2003,
          2081,
          2099,
          2261,
          2441,
          2268,
          2483,
          2367,
          2245,
          2458,
          2278,
          2236,
          2044,
          1871,
          1950,
          2134,
          2270,
          2377,
          2200,
          2255,
          2260,
          2141,
          2312,
          2137,
          2270,
          2128,
          1935,
          2032,
          2138,
          2297,
          2436,
          2583,
          2691,
          2502,
          2441,
          2300,
          2373,
          2329,
          2251,
          2379,
          2307,
          2470,
          2500,
          2380,
          2370,
          2408,
          2378,
          2299,
          2448,
          2496,
          2441,
          2538,
          2581,
          2544,
          2581,
          2477,
          2309,
          2354,
          2370,
          2357,
          2277,
          2263,
          2092,
          2212,
          2093,
          1940,
          2093,
          2143,
          2198,
          2385,
          2286,
          2284,
          2245,
          2306,
          2388,
          2281,
          2158,
          2213,
          2009,
          1924,
          2047,
          2164,
          2142,
          2092,
          2102,
          2005,
          1923
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
      "2026-01-01",
      "2026-01-02",
      "2026-01-03",
      "2026-01-04",
      "2026-01-05",
      "2026-01-06",
      "2026-01-07",
      "2026-01-08",
      "2026-01-09",
      "2026-01-10",
      "2026-01-11",
      "2026-01-12",
      "2026-01-13",
      "2026-01-14",
      "2026-01-15",
      "2026-01-16",
      "2026-01-17",
      "2026-01-18",
      "2026-01-19",
      "2026-01-20",
      "2026-01-21",
      "2026-01-22",
      "2026-01-23",
      "2026-01-24",
      "2026-01-25",
      "2026-01-26",
      "2026-01-27",
      "2026-01-28",
      "2026-01-29",
      "2026-01-30",
      "2026-01-31",
      "2026-02-01",
      "2026-02-02",
      "2026-02-03",
      "2026-02-04",
      "2026-02-05",
      "2026-02-06",
      "2026-02-07",
      "2026-02-08",
      "2026-02-09",
      "2026-02-10",
      "2026-02-11",
      "2026-02-12",
      "2026-02-13",
      "2026-02-14",
      "2026-02-15",
      "2026-02-16",
      "2026-02-17",
      "2026-02-18",
      "2026-02-19",
      "2026-02-20",
      "2026-02-21",
      "2026-02-22",
      "2026-02-23",
      "2026-02-24",
      "2026-02-25",
      "2026-02-26",
      "2026-02-27",
      "2026-02-28",
      "2026-03-01",
      "2026-03-02",
      "2026-03-03",
      "2026-03-04",
      "2026-03-05",
      "2026-03-06",
      "2026-03-07",
      "2026-03-08",
      "2026-03-09",
      "2026-03-10",
      "2026-03-11",
      "2026-03-12",
      "2026-03-13",
      "2026-03-14",
      "2026-03-15",
      "2026-03-16",
      "2026-03-17",
      "2026-03-18",
      "2026-03-19",
      "2026-03-20",
      "2026-03-21",
      "2026-03-22",
      "2026-03-23",
      "2026-03-24",
      "2026-03-25",
      "2026-03-26",
      "2026-03-27",
      "2026-03-28",
      "2026-03-29",
      "2026-03-30",
      "2026-03-31"
    ],
    "colors": [
      "#066fd1"
    ],
    "legend": {
      "show": false
    }
  },
  "chart-synced-visits": {
    "chart": {
      "id": "synced-visits",
      "type": "area",
      "fontFamily": "inherit",
      "height": 128,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": false
      },
      "animations": {
        "enabled": false
      },
      "group": "traffic"
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
        "name": "Visits",
        "data": [
          4255,
          4019,
          4307,
          4606,
          4506,
          4306,
          4249,
          4435,
          4453,
          4262,
          4336,
          4765,
          4977,
          4764,
          4718,
          4468,
          4395,
          4584,
          4689,
          4792,
          4565,
          4863,
          4547,
          4930,
          5310,
          4890,
          5352,
          5716,
          5599,
          5718
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
      "type": "datetime"
    },
    "yaxis": {
      "labels": {
        "padding": 4
      }
    },
    "labels": [
      "2026-06-01",
      "2026-06-02",
      "2026-06-03",
      "2026-06-04",
      "2026-06-05",
      "2026-06-06",
      "2026-06-07",
      "2026-06-08",
      "2026-06-09",
      "2026-06-10",
      "2026-06-11",
      "2026-06-12",
      "2026-06-13",
      "2026-06-14",
      "2026-06-15",
      "2026-06-16",
      "2026-06-17",
      "2026-06-18",
      "2026-06-19",
      "2026-06-20",
      "2026-06-21",
      "2026-06-22",
      "2026-06-23",
      "2026-06-24",
      "2026-06-25",
      "2026-06-26",
      "2026-06-27",
      "2026-06-28",
      "2026-06-29",
      "2026-06-30"
    ],
    "colors": [
      "#066fd1"
    ],
    "legend": {
      "show": false
    }
  },
  "chart-synced-signups": {
    "chart": {
      "id": "synced-signups",
      "type": "line",
      "fontFamily": "inherit",
      "height": 128,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": false
      },
      "animations": {
        "enabled": false
      },
      "group": "traffic"
    },
    "stroke": {
      "width": 2,
      "lineCap": "round",
      "curve": "smooth"
    },
    "series": [
      {
        "name": "Sign-ups",
        "data": [
          191,
          185,
          207,
          197,
          192,
          204,
          224,
          238,
          214,
          223,
          243,
          235,
          255,
          232,
          249,
          258,
          231,
          259,
          257,
          283,
          302,
          308,
          297,
          303,
          312,
          316,
          319,
          308,
          292,
          309
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
      "2026-06-01",
      "2026-06-02",
      "2026-06-03",
      "2026-06-04",
      "2026-06-05",
      "2026-06-06",
      "2026-06-07",
      "2026-06-08",
      "2026-06-09",
      "2026-06-10",
      "2026-06-11",
      "2026-06-12",
      "2026-06-13",
      "2026-06-14",
      "2026-06-15",
      "2026-06-16",
      "2026-06-17",
      "2026-06-18",
      "2026-06-19",
      "2026-06-20",
      "2026-06-21",
      "2026-06-22",
      "2026-06-23",
      "2026-06-24",
      "2026-06-25",
      "2026-06-26",
      "2026-06-27",
      "2026-06-28",
      "2026-06-29",
      "2026-06-30"
    ],
    "colors": [
      "#066fd1"
    ],
    "legend": {
      "show": false
    }
  },
  "chart-synced-revenue": {
    "chart": {
      "id": "synced-revenue",
      "type": "bar",
      "fontFamily": "inherit",
      "height": 128,
      "parentHeightOffset": 0,
      "toolbar": {
        "show": false
      },
      "animations": {
        "enabled": false
      },
      "group": "traffic"
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
        "name": "Revenue",
        "data": [
          991,
          1032,
          951,
          841,
          834,
          957,
          1027,
          990,
          944,
          1016,
          1023,
          956,
          864,
          765,
          686,
          807,
          791,
          715,
          720,
          793,
          778,
          759,
          827,
          889,
          783,
          883,
          915,
          1028,
          1164,
          1090
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
      "type": "datetime"
    },
    "yaxis": {
      "labels": {
        "padding": 4
      }
    },
    "labels": [
      "2026-06-01",
      "2026-06-02",
      "2026-06-03",
      "2026-06-04",
      "2026-06-05",
      "2026-06-06",
      "2026-06-07",
      "2026-06-08",
      "2026-06-09",
      "2026-06-10",
      "2026-06-11",
      "2026-06-12",
      "2026-06-13",
      "2026-06-14",
      "2026-06-15",
      "2026-06-16",
      "2026-06-17",
      "2026-06-18",
      "2026-06-19",
      "2026-06-20",
      "2026-06-21",
      "2026-06-22",
      "2026-06-23",
      "2026-06-24",
      "2026-06-25",
      "2026-06-26",
      "2026-06-27",
      "2026-06-28",
      "2026-06-29",
      "2026-06-30"
    ],
    "colors": [
      "#066fd1"
    ],
    "legend": {
      "show": false
    }
  }
};
