import * as React from 'react';
import styles from './MyTextBox.module.scss';
import { IMyTextBoxProps } from './IMyTextBoxProps';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import ConnectHelper from '../../../app/ConnectHelper';

/** テキストボックス表示コンポーネント */
export default class MyTextBox extends React.Component<IMyTextBoxProps, {}> {
  public render(): React.ReactElement<IMyTextBoxProps> {
    return (
      <div>
        <div>{ this.props.title }</div>
        <TextField onChanged={ (newValue) => { this.onTextChange(this.props.connectTo, newValue); } } ></TextField>
      </div>
    );
  }

  /** テキストボックス変更イベント */
  private onTextChange(connectTo : string, newValue : string)
  {
    if(connectTo)
    {
      let connectedWebpart = ConnectHelper.getWebpartInstance(connectTo);
      if(connectedWebpart)
      {
        connectedWebpart.flushValue(newValue);
      }
    }
  }
}
