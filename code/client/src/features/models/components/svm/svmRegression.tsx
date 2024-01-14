import "../../assets/css/models.css";
import "../../assets/css/all-model.css";
import { useSVMRegression } from "../../hooks/useSVMRegression";
import SVMResults from "./svmRegressionResults";
import Loader from "../../../../partials/loader";

const SVM = () => {
  const {normalization,setNormalization,trainTestSplit,setTrainTestSplit,degree,setDegree,maxIter,setMaxIter,kernel,setKernel,evaluationResults,targetVariable,setTargetVariable,loader,handleRunSVM,optionsPlot} = useSVMRegression();
  return (
    <div>
      <div className="model-container-wrapper d-flex ">
        <div className="model-container">
          <h5>Support Vector Machines</h5>
          <div className="model-label">
            <label className="model-label">Target Variable:</label>
            <select
              id="dropdown"
              className="model-select"
              value={targetVariable ? targetVariable : ""}
              onChange={(e) => setTargetVariable(e.target.value)}
            >
              {optionsPlot
                ?.slice()
                .reverse()
                .map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="model-label">Normalization:</label>
            <select
              className="model-select"
              value={normalization}
              onChange={(e) => setNormalization(e.target.value)}
            >
              <option value="MinMaxScaler">MinMax Scaler</option>
              <option value="StandardScaler">Standard Scaler</option>
              <option value="RobustScaler">Robust Scaler</option>
            </select>
          </div>
          <div>
            <label className="model-label">Percentage Test Set:</label>
            <input
              className="model-input"
              type="number"
              min={10}
              max={90}
              value={trainTestSplit}
              onChange={(e) => setTrainTestSplit(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label className="model-label">Max Iter:</label>
            <input
              className="model-input"
              type="number"
              value={maxIter}
              min={1}
              max={100}
              onChange={(e) => setMaxIter(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label className="model-label">Kernel:</label>
            <select
              className="model-select"
              value={kernel}
              onChange={(e) => setKernel(e.target.value)}
            >
              <option value="linear">Linear</option>
              <option value="rbf">RBF</option>
              <option value="sigmoid">Sigmoid</option>
              <option value="poly">Poly</option>
            </select>
          </div>
          {kernel === "poly" && (
            <div>
              <label className="model-label">Degree:</label>
              <input
                className="model-input"
                type="number"
                min={0}
                value={degree}
                onChange={(e) => setDegree(parseInt(e.target.value))}
              />
            </div>
          )}
          <button className="model-button" onClick={handleRunSVM}>
            Run
          </button>
        </div>
        <div className="results-container">
          {loader ? <Loader /> : <SVMResults modelData={evaluationResults} target={targetVariable} />}
        </div>
      </div>
    </div>
  );
};

export default SVM;
