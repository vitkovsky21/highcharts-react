import { useState } from "react";
import { Box, Button, Card, Modal, TextField, Typography } from "@mui/material";
import {
  useGetChartQuery,
  usePostChartMutation,
  useUpdateChartMutation,
} from "../services/chartApi";
import { makeStyles } from "@mui/styles";

import StartSpinner from "../components/StartSpinner";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import options from "../shared/Options";

const useStyles: any = makeStyles({
  card: {
    marginTop: "50px",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  err: {
    color: "red",
  },
});

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const btn = {
  position: "absolute",
  marginLeft: "30rem",
  marginTop: ".5rem",
  backgroundColor: "white",
  color: "#42a5f5",
  zIndex: 1,
  "&:hover": {
    backgroundColor: "#42a5f5",
    color: "white",
    cursor: "pointer",
  },
};

function SettingsPage() {
  let isLoading = true;
  let { data: chartsData } = useGetChartQuery();

  const [addChartData] = usePostChartMutation();
  const [changeChartData] = useUpdateChartMutation();
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [chartName, setChartName] = useState("");
  const [chartObj, setChartObj] = useState(options);

  const [toggler, setToggler] = useState(false);

  const [title, setTitle] = useState("");
  const [dates, setDates] = useState("");
  const [color, setColor] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState("");

  const addChart = () => {
    addChartData(options);
    isLoading = false;
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const postSubmit = options;

    postSubmit.title.text = (e.currentTarget[0] as HTMLInputElement).value;
    postSubmit.date = new Date((e.currentTarget[2] as HTMLInputElement).value);
    postSubmit.chart.type = (e.currentTarget[4] as HTMLInputElement).value;

    addChartData(postSubmit);
  };

  const submitChangeData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let putSubmit = JSON.parse(JSON.stringify(chartObj));

    putSubmit.title.text = (e.currentTarget[0] as HTMLInputElement).value;
    putSubmit.chart.type = (e.currentTarget[2] as HTMLInputElement).value;
    putSubmit.color = (e.currentTarget[4] as HTMLInputElement).value;

    changeChartData(putSubmit);
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

  let sortedData = [...chartsData].sort((a: any, b: any) => {
    return new Date(a.date).valueOf() - new Date(b.date).valueOf();
  });

  return (
    <div>
      <Button
        onClick={() => {
          setToggler(false);
          handleOpen();
        }}
      >
        ADD CHART
      </Button>

      {!toggler ? (
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography
              id="keep-mounted-modal-title"
              variant="h6"
              component="h2"
            >
              Add a new chart
            </Typography>
            <form onSubmit={submit}>
              <TextField
                name="Title"
                variant="outlined"
                label="Title"
                margin="normal"
                value={title}
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
                autoFocus
                fullWidth
              />
              <TextField
                name="Dates"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDates(e.target.value)
                }
                variant="outlined"
                value={dates}
                type="text"
                label="Dates (2007/09, 2012/12)"
                margin="normal"
                fullWidth
              />
              <TextField
                name="Type"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setType(e.target.value)
                }
                variant="outlined"
                value={type}
                type="text"
                label="Type (line, spline, area…)"
                margin="normal"
                fullWidth
              />
              {error && (
                <Typography className={classes.err} variant="h6">
                  {error || "Ошибка!"}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Add
              </Button>
            </form>
          </Box>
        </Modal>
      ) : (
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography
              id="keep-mounted-modal-title"
              variant="h6"
              component="h2"
            >
              Change Data
            </Typography>
            <form onSubmit={submitChangeData}>
              <TextField
                name="Chart Name"
                variant="outlined"
                label="Chart Name"
                margin="normal"
                value={chartName}
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setChartName(e.target.value)
                }
                autoFocus
                fullWidth
              />
              <TextField
                name="Type"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setType(e.target.value)
                }
                variant="outlined"
                value={type}
                type="text"
                label="Type (line, spline, area…)"
                margin="normal"
                fullWidth
              />
              <TextField
                name="Color"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setColor(e.target.value)
                }
                variant="outlined"
                value={color}
                type="text"
                label="Color (example: #1C110A)"
                margin="normal"
                fullWidth
              />
              {error && (
                <Typography className={classes.err} variant="h6">
                  {error || "Ошибка!"}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Add
              </Button>
            </form>
          </Box>
        </Modal>
      )}

      <Card className={classes.card}>
        {sortedData &&
          !!sortedData.length &&
          sortedData.map((chart: any) => (
            <div key={chart.id}>
              <Typography
                onClick={() => {
                  setChartObj({...chart})
                  setToggler(true);
                  handleOpen();
                }}
                sx={btn}
              >
                Change Data
              </Typography>
              <HighchartsReact highcharts={Highcharts} options={chart} />
            </div>
          ))}
      </Card>
    </div>
  );
}

export default SettingsPage;
