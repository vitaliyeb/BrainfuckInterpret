import styles from './style.module.css';
import React, {useMemo, useRef, useState} from "react";
import classNames from "classnames";
import interpret, { Interpret } from "../../utils/interpret";

interface IProps {
    code: string
}

const ControlPanel: React.FC<IProps> = ({ code }) => {
    const [isShow, setIsShow] = useState(true);
    const [inputParams, setInputParams] = useState('');
    const [isShowInputParams, setIsShowInputParams] = useState(true);
    const lastCodeInter = useRef('');
    const [{ result, error, ms }, setInterData] = useState<ReturnType<Interpret>>({result: '', error: null, ms: 0});


    const runCode = () => {
        if(lastCodeInter.current !== code) {
            setInterData(interpret(code));
            lastCodeInter.current = code;
        }
    }

    return <div className={classNames(styles.panelWrapper, {[styles.panelShow]: isShow})}>
        <input
            placeholder={'10, 22, 13...'}
            className={classNames(styles.inputPanel, {[styles.showInputParams]: isShowInputParams})}
            onChange={e => setInputParams(e.target.value)}
            value={inputParams}
        />
        <div className={styles.actionsBar}>
            <button
                className={styles.primaryButton}
                onClick={runCode}
            >
                Run
            </button>
            <button
                onClick={() => setIsShowInputParams(!isShowInputParams)}
                className={classNames(styles.primaryButton, {[styles.active]: isShowInputParams})}
            >
                Input
            </button>

            <button
                onClick={() => setIsShow(!isShow)}
                className={classNames(styles.viewsButton, {[styles.viewsButtonShow]: isShow})}
            />
        </div>
        <div className={classNames(styles.content)}>
            { !error && <p className={styles.result}>{ result }</p> }
            { error && <p className={styles.error}>{ error }</p> }
        </div>
    </div>
}

export default ControlPanel;