import React, { useState } from 'react';

import './ToastContainer.css';
import Toast, {toastListProp, positionType} from './components/toast/Toast';
import checkIcon from './assets/check.svg';
import errorIcon from './assets/error.svg';
import infoIcon from './assets/info.svg';
import warningIcon from './assets/warning.svg';



const DEFAULT_DISMISS_ACTIVE = false;
const DEFAULT_AUTODELETE_TIME = 3500;
const DEFAULT_POSITION = positionType["top-right"];

type toastState = {
  toastList: Array<toastListProp>,
  position: positionType,
  autoDismiss: boolean,
  dismissTime: number,
}

const initialList: Array<toastListProp> = [];

const ToastContainer = () => {
  const [list, setList] = useState(initialList);
  const [position, setPosition] = useState(positionType["top-right"]);
  let [autoDismissCheckValue, setAutoDismissCheckValue] = useState(DEFAULT_DISMISS_ACTIVE);
  const [autoDismissTime, setAutoDismissTime] = useState(DEFAULT_AUTODELETE_TIME);


  const selectPosition = (pos: positionType) => {
    console.log("selectPosition to: index" + pos + "; value:" + positionType[pos]);
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
  
  const setDefaultDismiss = (b: boolean) => {
    console.log("setDefaultDismiss to:" + b);
    setAutoDismissCheckValue(b);
    setList([]);
  }

  const setDefaultDismissDelay = (delay: number) => {
    console.log(" setDefaultDismissDelay:" + delay);
    setAutoDismissTime(delay);
  }

  return (
    <div className="toastContainer">
      <Toast 
        toastList={list}
        position={position}
        autoDismiss={autoDismissCheckValue}
        dismissTime={autoDismissTime}
      />
    </div>
  );
}

//export default ToastContainer;
export {ToastContainer};
