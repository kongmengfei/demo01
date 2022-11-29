import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import styles from './Targetwp01WebPart.module.scss';

export interface ITargetwp01WebPartProps {
}

export default class Targetwp01WebPart extends BaseClientSideWebPart<ITargetwp01WebPartProps> {
  public render(): void {
    this.domElement.innerHTML = `<div class="${ styles.targetwp01 }"></div>`;
  }

  protected onInit(): Promise<void> {
    return super.onInit();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
