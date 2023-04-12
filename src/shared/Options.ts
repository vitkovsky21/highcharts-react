const options = {
  chart: {
    type: "column",
  },
  credits: {
    enabled: false,
  },
  title: {
    align: "left",
    text: "Browser market shares. January, 2022",
  },
  xAxis: {
    type: "category",
  },
  yAxis: {
    title: {
      text: "Total percent market share",
    },
  },
  legend: {
    enabled: false,
  },
  plotOptions: {
    series: {
      borderWidth: 0,
      dataLabels: {
        enabled: true,
        format: "{point.y:.1f}%",
      },
    },
  },
  series: [
    {
      name: "Browsers",
      colorByPoint: true,
      data: [
        {
          name: "Chrome",
          y: 63.06,
          drilldown: "Chrome",
        },
        {
          name: "Safari",
          y: 19.84,
          drilldown: "Safari",
        },
        {
          name: "Firefox",
          y: 4.18,
          drilldown: "Firefox",
        },
        {
          name: "Edge",
          y: 4.12,
          drilldown: "Edge",
        },
        {
          name: "Opera",
          y: 2.33,
          drilldown: "Opera",
        },
        {
          name: "Internet Explorer",
          y: 0.45,
          drilldown: "Internet Explorer",
        },
        {
          name: "Other",
          y: 1.582,
          drilldown: null,
        },
      ],
    },
  ],
  date: new Date(),
};

export default options