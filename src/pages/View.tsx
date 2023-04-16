import { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateRange, LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { Card, Typography } from "@mui/material";
import { useGetChartQuery } from "../services/chartApi";
import { makeStyles } from "@mui/styles";

import StartSpinner from "../components/StartSpinner";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const useStyles: any = makeStyles({
  card: {
    marginTop: "50px",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
});

function ViewPage() {
  let isLoading = true;
  let filteredCharts: any[] = [];
  let { data: chartsData } = useGetChartQuery();

  const [value, setValue] = useState<DateRange<Date>>([null, null]);
  const classes = useStyles();

  if (!chartsData) {
    return <StartSpinner />;
  }

  if (isLoading && chartsData.length < 1) {
    return (
      <div>
        <Typography>You don't have charts yet.</Typography>
      </div>
    );
  }

  if (value[0] != null && value[1] != null) {
    filteredCharts = chartsData.filter((chart: any) => {
      return (
        // @ts-ignore
        chart.date >= value[0]?.toJSON() &&
        // @ts-ignore
        chart.date <= value[1]?.toJSON()
      );
    });
  } else {
    filteredCharts = chartsData;
  }

  let sortedData = [...filteredCharts].sort((a: any, b: any) => {
    return new Date(a.date).valueOf() - new Date(b.date).valueOf();
  });

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateRangePicker"]}>
          <DateRangePicker
            localeText={{ start: "Check-in", end: "Check-out" }}
            value={value}
            onChange={(newValue: any) => {
              setValue(newValue);
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
      <Card className={classes.card}>
        {sortedData &&
          !!sortedData.length &&
          sortedData.map((chart: any) => (
            <HighchartsReact
              key={chart.id}
              highcharts={Highcharts}
              options={chart}
            />
          ))}
      </Card>
    </div>
  );
}

export default ViewPage;
