import React, { useState, useEffect}  from 'react';
import { format } from 'date-fns';
import './Toast.css';

const DEFAULT_DATE_FORMAT = "yyyy-MM-dd hh:mm:ss"

export type toastListProp = {
    id: number,
    title: string,
    description: string,
    backgroundColor: string,
    icon: string,
    //position: positionType,
    //autoDismiss: boolean,
    //dismissTime: number,
}

export enum positionType {
    'top-right',
    'bottom-right',
    'top-left',
    'bottom-left',
    'None',
}

type propsTypes = {
    toastList: Array<toastListProp>,
    position: positionType,
    autoDismiss: boolean,
    dismissTime: number
}


const Toast = (props: propsTypes) => {
    console.log("#### Toast:"+JSON.stringify(props));
    const { toastList, position, autoDismiss, dismissTime } = props;
    const [list, setList] = useState(toastList);


    useEffect(() => {
        setList([...toastList]);

        // eslint-disable-next-line
    }, [toastList]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (autoDismiss && toastList.length && list.length) {
                deleteToast(toastList[0].id);
            }
        }, dismissTime);
        
        return () => {
            clearInterval(interval);
        }

        // eslint-disable-next-line
    }, [toastList, autoDismiss, dismissTime, list]);

    const deleteToast = (id: number) => {
        const listItemIndex = list.findIndex(e => e.id === id);
        const toastListItem = toastList.findIndex(e => e.id === id);
        list.splice(listItemIndex, 1);
        toastList.splice(toastListItem, 1);
        setList([...list]);
    }

    const aDate = new Date();
    const aDateStr =  format(aDate, DEFAULT_DATE_FORMAT)

    return (
        <>
            <div className={`notification-container ${positionType[position]}`}>
                {
                    list.map((toast, i) =>     
                        <div 
                            key={i}
                            className={`notification toast ${positionType[position]}`}
                            style={{ backgroundColor: toast.backgroundColor }}
                            >
                            <button onClick={() => deleteToast(toast.id)}>
                                X
                            </button>
                            <div className="notification-image">
                                <img src={toast.icon} alt="" />
                            </div>
                            <div>
                                <p className="notification-title">{toast.title}</p>
                                <p className="notification-message">
                                    {toast.description}
                                </p>
                                <p className="notification-date">At: {aDateStr}</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    );
}

export default Toast;
