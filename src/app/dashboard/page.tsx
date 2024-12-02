'use client';

import { useEffect, useState } from 'react';
import { Typography, Box, List, ListItem, ListItemText, Divider } from '@mui/material';
import { IconButton } from '@/once-ui/components';
import { Feedback } from '@/once-ui/components';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Scatter,
  Legend,
} from 'recharts';

type LogEntry = {
  timeStep: number;
  value: number;
  isAnomaly: boolean;
};

type PredictionResponse = {
  isAnomalous: boolean;
  meanReconstructionError: number;
  reconstructionErrors: number[];
  threshold: number;
};

export default function Dashboard() {
  const [logData, setLogData] = useState<LogEntry[]>([]);
  const [currentTimeStep, setCurrentTimeStep] = useState<number>(0);
  const [trainingMean, setTrainingMean] = useState<number>(0);
  const [trainingStd, setTrainingStd] = useState<number>(1);
  const [isFetchingParams, setIsFetchingParams] = useState<boolean>(true);
  const [predictionResults, setPredictionResults] = useState<PredictionResponse | null>(null);

  useEffect(() => {
    const fetchNormalizationParams = async () => {
      try {
        const response = await fetch('/api/normalization-params');
        if (!response.ok) {
          throw new Error('Failed to fetch normalization parameters');
        }
        const params = await response.json();
        setTrainingMean(params.mean[0]);
        setTrainingStd(params.std[0]);
        setIsFetchingParams(false);
      } catch (error) {
        console.error('Error fetching normalization parameters:', error);
        setIsFetchingParams(false);
      }
    };
    fetchNormalizationParams();
  }, []);

  const generateSampleSequence = (): number[] => {
    const timeSteps = 288;
    const sequence: number[] = [];
    for (let i = 0; i < timeSteps; i++) {
      let value = Math.sin((2 * Math.PI * i) / timeSteps) + Math.random() * 0.1;
      if (Math.random() < 0.1) {
        value += Math.random() * 1 + 1;
      }
      const normalizedValue = (value - trainingMean) / trainingStd;
      sequence.push(normalizedValue);
    }
    return sequence;
  };

  useEffect(() => {
    if (isFetchingParams) {
      return;
    }

    const interval = setInterval(async () => {
      await fetchPredictions();
    }, 60000);

    return () => clearInterval(interval);
  }, [currentTimeStep, trainingMean, trainingStd, isFetchingParams]);

  const fetchPredictions = async () => {
    try {
      if (trainingStd === 0) {
        console.error('Training standard deviation is zero. Cannot normalize data.');
        return;
      }

      const sequence = generateSampleSequence();

      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sequence: sequence,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to fetch predictions: ${errorData.detail || response.statusText}`);
      }

      const data: PredictionResponse = await response.json();

      if (!Array.isArray(data.reconstructionErrors) || typeof data.threshold !== 'number') {
        console.error("Invalid data format received");
        return;
      }

      const newLogData: LogEntry[] = data.reconstructionErrors.map(
        (value: number, index: number) => ({
          timeStep: currentTimeStep + index,
          value,
          isAnomaly: value > data.threshold,
        })
      );

      setLogData((prev) => [...prev, ...newLogData]);
      setCurrentTimeStep(currentTimeStep + newLogData.length);
      setPredictionResults(data);
    } catch (error: any) {
      console.error('Error fetching predictions:', error.message || error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', background: 'white', padding: '20px', height: '100%'}}>
     <IconButton icon='chevronLeft' href='/' size='l'/> 
     <Box sx={{ flex: 2, marginRight: '20px' }}>
        <Typography variant="h4">Anomaly Detection Dashboard</Typography>
        <LineChart
          width={800}
          height={500}
          data={logData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timeStep"
            label={{ value: 'Time Step', position: 'insideBottomRight', offset: 0 }}
          />
          <YAxis
            label={{ value: 'Reconstruction Error', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            name="Reconstruction Error"
            stroke="#8884d8"
            dot={false}
          />
          <Scatter
            name="Anomalies"
            data={logData.filter((entry) => entry.isAnomaly)}
            line={{ stroke: 'red' }}
            fill="red"
            dataKey="value"
          />
        </LineChart>
      </Box>

      <Box sx={{ flex: 1 }}>
        <Typography variant="h3">Prediction Results</Typography>
        <Feedback style={{height: '300px', marginLeft: '-25%'}}>
          <List >
          {predictionResults ? (
            <>
              <ListItem>
                <ListItemText
                  primary="Anomaly Detected?"
                />
                <ListItemText
                primary={predictionResults.isAnomalous ? 'Yes' : 'No'}/>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Mean Reconstruction Error:"
                />
                <ListItemText
                  primary={predictionResults.meanReconstructionError.toFixed(4)}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Threshold:"
                />
                <ListItemText
                  primary={predictionResults.threshold.toFixed(4)}
                />
              </ListItem>
            </>
          ) : (
            <ListItem>
              <ListItemText primary="No prediction results yet." />
            </ListItem>
          )}
        </List>
        </Feedback>
      </Box>
    </Box>
  );
}
