import { useState } from "react";
import { useNavigate } from "react-router-dom";

import StartSpinner from '../components/StartSpinner';

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
import { useGetChartQuery } from "../services/chartApi";

function ViewPage() {
  const isLoading = false;
  const navigate = useNavigate();

  let { data: chartData } = useGetChartQuery();

  if (isLoading && !chartData) {
    return <StartSpinner />;
  }

  console.log(chartData)

  return (
  <div>
    <Card>
      <div>1</div>
    </Card>
    <Card>
      <div>2</div>
    </Card>
  </div>
  )
  
}

export default ViewPage;
