import axios from "axios";
import { useState } from "react";
import { useAppSelector } from "../../../contexts/file/hooks";
import { useChart } from "../../visualization/hooks/useChart";

export const useDecisionTreeRegression = () => {
    const [normalization, setNormalization] = useState("MinMaxScaler");
  const [trainTestSplit, setTrainTestSplit] = useState(40);
  const [maxDepth, setMaxDepth] = useState(3);
  const [criterion, setCriterion] = useState("friedman_mse");
  const { supervisedML } = useChart();
  const optionsPlot = useAppSelector((state) => state.file.optionsPlot);
  const [evaluationResults, setEvaluationResults] = useState(null);
  const [targetVariable, setTargetVariable] = useState<string>("Select a Target");
  const address = import.meta.env.VITE_BACKEND_REQ_ADDRESS;
  const file_url = useAppSelector((state) => state.file.url);
  const [loader, setLoader] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');

  
  const handleInference = async ()=>{
    console.log("Decision Tree Regression Inference Time..");
  }

  const handleRunDecisionTree = async () => {
    try {
      if (targetVariable === 'Select a Target') {
        setErrorMessage('Please select a target variable');
        return;
      }
      setErrorMessage('');
      setLoader(true);
      const response = await axios.post(`${address}/api/decision_tree/regression/`, {
        file_url: file_url,
        target: targetVariable,
        normalization: normalization,
        train_test_split: trainTestSplit,
        max_depth: maxDepth,
        criterion: criterion,
      });
      setEvaluationResults(JSON.parse(response.data));
      setLoader(false);
    } catch (error) {
      console.error("Error during backend request:");
    }
  };

  return {handleInference,targetVariable,supervisedML,setTargetVariable,optionsPlot,normalization, setNormalization, trainTestSplit, setTrainTestSplit, maxDepth, setMaxDepth, criterion, setCriterion, evaluationResults, handleRunDecisionTree,errorMessage, loader}
}