import { ARRAY, DATE, ModelAttributes } from "sequelize";
import { DataType, Model } from "sequelize-typescript";

export interface IChart {
  chart?: {
    style: {
      color: string;
    }
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
  colors?: string;
  series?: any[];
  date?: Date;
}

const { JSON, STRING } = DataType;

export const ChartModel: ModelAttributes<Model, IChart> = {
  chart: {
    type: JSON,
    allowNull: false,
  },
  credits: {
    type: JSON,
    allowNull: false,
  },
  title: {
    type: JSON,
    allowNull: false,
  },
  xAxis: {
    type: JSON,
    allowNull: false,
  },
  yAxis: {
    type: JSON,
    allowNull: false,
  },
  legend: {
    type: JSON,
    allowNull: false,
  },
  plotOptions: {
    type: JSON,
    allowNull: false,
  },
  series: {
    type: ARRAY(JSON),
    allowNull: false,
  },
  colors: {
    type: STRING,
    allowNull: true
  },
  date: {
    type: DATE,
    allowNull: false,
  },
};
