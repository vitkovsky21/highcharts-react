import { useState } from "react";
import { useNavigate } from "react-router-dom";

import StartSpinner from "../components/StartSpinner";

import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateRange, LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

import {
  Table,
  Box,
  Card,
  TableContainer,
  Typography,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Paper,
  Button,
  DialogActions,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useGetChartQuery, usePostChartMutation } from "../services/chartApi";
import options from "../shared/Options";

function ViewPage() {
  let isLoading = true;
  let filteredCharts: any[] = [];

  let { data: chartsData } = useGetChartQuery();
  const [addChartData] = usePostChartMutation();

  const [value, setValue] = useState<DateRange<Date>>([null, null]);

  const addChart = () => {
    addChartData(options);
    isLoading = false;
  };

  if (!chartsData) {
    return <StartSpinner />;
  }
  if (isLoading && chartsData.length < 1) {
    return (
      <div onClick={addChart}>
        <StartSpinner />
      </div>
    );
  }

  if (value[0] != null && value[1] != null) {
    filteredCharts = chartsData.filter((chart: any) => {
      return (
        // @ts-ignore
        chart.date >= value[0]?.toJSON() &&
        // @ts-ignores
        chart.date <= value[1]?.toJSON()
      );
    });
  } else {
    filteredCharts = chartsData;
  }

  console.log(filteredCharts);

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
      <Card>
        {filteredCharts &&
          !!filteredCharts.length &&
          filteredCharts.map((chart: any) => (
            <HighchartsReact
              key={chart.chart}
              highcharts={Highcharts}
              options={chart}
            />
          ))}
      </Card>
    </div>
  );
}

export default ViewPage;
