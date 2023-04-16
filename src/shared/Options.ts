const options = {
  chart: {
    style: {
      color: "#96ed89"
    },
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
      data: [
        {
          name: "Chrome",
          y: 63.06,
          drilldown: "Chrome",
          color: "#E82C0C",
        },
        {
          name: "Safari",
          y: 19.84,
          drilldown: "Safari",
          color: "#FF530D",
        },
        {
          name: "Firefox",
          y: 4.18,
          drilldown: "Firefox",
          color: "#FF0000",
        },
        {
          name: "Edge",
          y: 4.12,
          drilldown: "Edge",
          color: "#E80C7A",
        },
        {
          name: "Opera",
          y: 2.33,
          drilldown: "Opera",
          color: "#96ed89",
        },
        {
          name: "Internet Explorer",
          y: 0.45,
          drilldown: "Internet Explorer",
          color: "#bedb39",
        },
        {
          name: "Other",
          y: 1.582,
          drilldown: null,
          color: "#bedb39",
        },
      ],
    },
  ],
  date: new Date(),
};

export default options;
