import React, { useState } from "react";
import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash,faPenToSquare,faCheck} from "@fortawesome/free-solid-svg-icons";
function App() {
  const [idata, setidata] = useState("");
  const [data, setData] = useState([]);
  const [buttonl, setbuttonl] = useState("Add");
  const [ind, setind] = useState();
  const [completed, setComplete] = useState([]);

  const addtodo = () => {
    if (buttonl === "Add") {
      setData([...data, idata]);
      setidata("");
    } else {
      setData(data.map((item, index) => (index === ind ? idata : item)));
      setbuttonl('Add');
      setidata("");
      setind(null);
    }
  };

  const del = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const upd = (index) => {
    setind(index);
    setidata(data[index]);
    setbuttonl("Update");
  };

  const complete = (index) => {
    const task = data[index];
    setComplete([...completed, task]);
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  const delcomp = (index) => {
    const newCompleted = [...completed];
    newCompleted.splice(index, 1);
    setComplete(newCompleted);
  };

  return (
    <div className="main-container">
      <div className="input-field">
        <input type="text" value={idata} onChange={(e) => setidata(e.target.value)} placeholder="Add your task here......." id="input" />
        {idata !== "" && (
          <button onClick={addtodo} id="but">{buttonl}</button>
        )}
      </div>
      <div>
        {data.length > 0 ? (
          <div className="pending-cont">
            <h1 id="pend-title">Pending-Tasks</h1>
            <ul className="pend-list">
              {data.map((item, index) => (
                <li key={index} id="item">
                  <div id="task">{item}</div>
                  <div id="but2">
                    <button onClick={() => del(index)} id="icon"><FontAwesomeIcon icon={faTrash}/> </button>
                    <button onClick={() => upd(index)} id="icon"><FontAwesomeIcon icon={faPenToSquare}/></button>
                    <button onClick={() => complete(index)} id="icon"><FontAwesomeIcon icon={faCheck}/></button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : <h1 id="no-pen">No-Pending Tasks</h1>}

        {completed.length > 0 && (
          <div className="completed-tasks">
            <h1 id="comp-title">Completed-Tasks</h1>
            <ul id="comp-list">
              {completed.map((item, index) => (
                <li key={index} id="item">
                  <div id="task">{item}</div>
                  <div id="but2">
                    <button onClick={() => delcomp(index)} id="icon"><FontAwesomeIcon icon={faTrash}/></button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
