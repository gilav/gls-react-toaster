import React, { useState } from 'react';

import './Demo.css';
import Toast, {toastListProp, positionType} from './components/toast/Toast';
import checkIcon from './assets/check.svg';
import errorIcon from './assets/error.svg';
import infoIcon from './assets/info.svg';
import warningIcon from './assets/warning.svg';
import Button from './components/button/Button';

const BUTTON_PROPS = [
  {
    id: 1,
    type: 'success',
    className: 'success',
    label: 'Success'
  },
  {
    id: 2,
    type: 'danger',
    className: 'danger',
    label: 'Danger'
  },
  {
    id: 3,
    type: 'info',
    className: 'info',
    label: 'Info'
  },
  {
    id: 4,
    type: 'warning',
    className: 'warning',
    label: 'Warning'
  },
];

const DEFAULT_DISMISS_ACTIVE = false;
const DEFAULT_AUTODELETE_TIME = 3500;
const DEFAULT_POSITION = positionType["top-right"];

export type toastState = {
  toastList: Array<toastListProp>,
  position: positionType,
  autoDismiss: boolean,
  dismissTime: number,
}

const initialList: Array<toastListProp> = [];



const App = () => {
  const [list, setList] = useState(initialList);
  const [position, setPosition] = useState(positionType["top-right"]);
  let [autoDismissCheckValue, setAutoDismissCheckValue] = useState(DEFAULT_DISMISS_ACTIVE);
  const [autoDismissTime, setAutoDismissTime] = useState(DEFAULT_AUTODELETE_TIME);


  const selectPosition = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    console.log("selectPosition to:" + e.target.value);
    switch(e.target.value) {
      case 'top-right':
        setPosition(positionType["top-right"]);
        break;

      case 'top-left':
        setPosition(positionType["top-left"]);
        break;

      case 'bottom-right':
        setPosition(positionType["bottom-right"]);
        break;

      case 'bottom-left':
        setPosition(positionType["bottom-left"]);
        break;

      default:
        setPosition(DEFAULT_POSITION);
    }
    setList([]);
  }

  const showToast = (type: string, title?: string, description?: string) => {
    console.log("show toast; type:" + type);
    const id = Math.floor((Math.random() * 101) + 1);

    var toastProperties = undefined;


    switch(type) {
      case 'success':
        toastProperties = {
          id,
          title: title===undefined ? 'Success' : title,
          description: description===undefined ? 'This is a success toast component' : description,
          backgroundColor: '#5cb85c',
          icon: checkIcon
        }
        break;
      case 'danger':
        toastProperties = {
          id,
          title: title===undefined ? 'Danger' : title,
          description: description===undefined ? 'This is a error toast component' : description,
          backgroundColor: '#d9534f',
          icon: errorIcon
        }
        break;
      case 'info':
        toastProperties = {
          id,
          title: title===undefined ? 'Info' : title,
          description: description===undefined ? 'This is an info toast component' : description,
          backgroundColor: '#5bc0de',
          icon: infoIcon
        }
        break;
      case 'warning':
        toastProperties = {
          id,
          title: title===undefined ? 'Warning' : title,
          description: description===undefined ? 'This is a warning toast component' : description,
          backgroundColor: '#f0ad4e',
          icon: warningIcon
        }
        break;

      default:
        console.log("showToast setList to empty");
        setList([]);
    }

    console.log("showToast setList with new toastProperties"+ JSON.stringify(toastProperties));
    if(toastProperties!==undefined){
      setList([...list, toastProperties]);
    }
  }
  
   const onAutoDismissCheckBoxChange = () => {
    console.log("onAutoDismissCheckBoxChange");
    autoDismissCheckValue = !autoDismissCheckValue;
    setAutoDismissCheckValue(autoDismissCheckValue);
    setList([]);
  }

  const onAutoDismissDelayInputChange = (e:any) => {
    const time = parseInt(e.target.value, 10);
    console.log("will setAutoDeleteTime:" + time);
    setAutoDismissTime(time);
  }

  console.log("@@@@ position:" + position);

  return (
    <div className="app">

      <div className="app-header">
        <p>React Toast Component</p>
        <div className="toast-buttons">
          {
            BUTTON_PROPS.map(e => {

              console.log("button label:"+ e.label +" will be className:" + `${position === positionType.None ? `${e.className} btn-disable` : `${e.className}`}`);

              return(
              <Button 
                key={e.id}
                className={`${position === positionType.None ? `${e.className} btn-disable` : `${e.className}`}`}
                label={e.label}
                handleClick={() => showToast(e.type)}
              />)}
            )
          }
        </div>

        <div className="select">
          <input 
            id="auto"
            type="checkbox"
            name="checkbox"
            checked={autoDismissCheckValue}
            onChange={onAutoDismissCheckBoxChange}
          />
          <label htmlFor="auto">Auto Dismiss time (mesc) :</label>
        </div>

        <div className="select">
          <input 
            className={`${!autoDismissCheckValue ? 'disabled' : ''}`}
            type="text"
            name="checkbox"
            placeholder="Dismiss time Ex: 3000"
            autoComplete="false"
            onChange={onAutoDismissDelayInputChange}
            value={DEFAULT_AUTODELETE_TIME}
          />
        </div>
        
        <div className="select">
          <span>Select corner position :</span>
          <select
            name="position"
            value={position}
            onChange={selectPosition}
            className="position-select"
          >
            <option value="top-right">Top Right</option>
            <option value="top-left">Top Left</option>
            <option value="bottom-left">Bottom Left</option>
            <option value="bottom-right">Bottom Right</option>
          </select>
        </div>
      </div>

      <Toast 
        toastList={list}
        position={position}
        autoDismiss={autoDismissCheckValue}
        dismissTime={autoDismissTime}
      />

    </div>
  );
}

export {App};
