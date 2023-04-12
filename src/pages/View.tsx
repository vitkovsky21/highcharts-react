import { useState } from "react";
import { useNavigate } from "react-router-dom";

import StartSpinner from "../components/StartSpinner";

import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

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

function ViewPage() {
  const isLoading = false;
  const navigate = useNavigate();

  let { data: chartsData } = useGetChartQuery();
  const [addChartData] = usePostChartMutation();

  if (isLoading || !chartsData) {
    return <StartSpinner />;
  }

  console.log(chartsData);

  return (
    <div>
      <Card>
        <HighchartsReact highcharts={Highcharts} options={chartsData[0]} />
      </Card>
    </div>
  );
}

export default ViewPage;
