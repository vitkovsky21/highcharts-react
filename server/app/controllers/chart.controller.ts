// import fetch from 'node-fetch';
import type { Request, Response } from "express";
import { Chart } from "../../db";

type Chart = {
  chart?: {
    type: string;
  };
  credits?: {
    enabled: boolean;
  };
  title?: {
    text: string;
  };
  xAxis?: {
    categories: any[];
  };
  yAxis?: {
    min: number;
    title: {
      text: string;
    };
  };
  legend?: {
    reversed: boolean;
  };
  plotOptions?: {
    series: {
      stacking: string;
    };
  };
  series?: any[];
  date?: Date;
};

export const create = (req: Request, res: Response) => {
  console.log(req.body.amount);
  const chart: Chart = {
    chart: req.body.chart,
    credits: req.body.credits,
    title: req.body.title,
    xAxis: req.body.xAxis,
    yAxis: req.body.yAxis,
    legend: req.body.legend,
    plotOptions: req.body.plotOptions,
    series: req.body.series,
    date: req.body.date
  };

  Chart.create(chart)
    .then((data: any) => {
      console.log(data);
      res.send(data);
    })
    .catch((err: { message: any }) => {
      res.status(500).send({
        message: err.message || "Some error occurred.",
      });
    });
};

export const findAll = (_: Request, res: Response) => {
  Chart.findAll()
    .then((data: any) => {
      console.log("RESPONSE!! ", data);
      res.send(data);
    })
    .catch((err: { message: any }) => {
      res.status(500).send({
        message: err.message || "Some error occurred while getting all posts.",
      });
    });
};

export const update = (req: Request, res: Response) => {
  const chart = req.params.chart;

  Chart.update(req.body, {
    where: { chart: chart },
  })
    .then((num) => {
      if (num) {
        res.send({
          message: "Updated successfully.",
        });
      } else {
        res.send({
          message: `Maybe Stock was not found or req.body is empty!`,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + chart,
      });
    });
};
