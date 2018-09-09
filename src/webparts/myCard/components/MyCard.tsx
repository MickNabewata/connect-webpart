import * as React from 'react';
import styles from './MyCard.module.scss';
import { IMyCardProps } from './IMyCardProps';

/** カード表示コンポーネント */
export default class MyCard extends React.Component<IMyCardProps, {}> {
  public render(): React.ReactElement<IMyCardProps> {
    return (
      <div className={ styles.myCard }>
        <div>{ this.props.title }</div>
        <div className={ styles.bodyContainer } >{ this.props.text }</div>
      </div>
    );
  }
}
