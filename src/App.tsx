import * as React from 'react';
import {  ElementDataService } from "./services/dataService";

import { ElementList } from './components/ElementList';
import {RefreshButton} from "./components/RefreshButton";
import {AutoRefreshCheckBox} from "./components/AutoRefreshCheckbox";
//import { IComponent } from './models/component';
//import { IWbsItem } from './models/wbsItem';
import { IElement } from './models/element';

import * as socketio from 'socket.io-client';

interface IState {
     autoRefresh: boolean;
     components: Array<IElement>;
     wbsItems: Array<IElement>;
     loading: boolean;
     err: Error | undefined;
}

const intervalTime = 5000;

export class App extends React.Component<any, IState> {

     elementDataService: ElementDataService;
     socket: SocketIOClient.Socket;
     intervalId: number;
     state: IState;
     constructor(props: any) {
          super(props);
          this.elementDataService = new ElementDataService();
          this.socket = socketio("http://localhost:3030");
          this.state = {autoRefresh: false, components: [], wbsItems: [], loading: true, err: undefined};
     }

     render() {
          if(this.state.loading) {
               return <p>Loading...</p>
          }
          if(this.state.err) {
               return <p>{this.state.err.message}</p>
          }
          return (
               <div>
                    <RefreshButton title="Refresh All" onClick={this.refreshAll} />
                    <RefreshButton title="Refresh Components" onClick={this.refreshComponents} />
                    <RefreshButton title="Refresh WBS Items" onClick={this.refreshWbsItems} />
                    <AutoRefreshCheckBox label="Automatically Refresh" 
                                         isChecked={this.state.autoRefresh} onChange={this.toggleAutoRefresh} />
                    <ul>
                         <li>Components</li>
                         <ElementList elements={this.state.components} />
                    </ul>
                    <ul>
                         <li>WBS Items</li>
                         <ElementList elements={this.state.wbsItems} />
                    </ul>
               </div>
               );
     }

     toggleAutoRefresh = () => {
          let autoRefresh = !this.state.autoRefresh;
          console.log(`Turning AutoRefresh ${autoRefresh ? "ON" : "OFF"}`);
          if(autoRefresh) {
               this.refreshAll();
          //      this.intervalId = setInterval(() => {
          //                 this.refreshAll();
          //            }, intervalTime);
          
          // } else if(this.intervalId) {
          //      clearInterval(this.intervalId);
          }

          this.setState({autoRefresh : autoRefresh});
     }

     refreshAll = async () => {
          try {
               let components = await this.elementDataService.fetchComponents();
               this.setState({components: components, err: undefined});
               let wbsItems = await this.elementDataService.fetchWbsItems();
               this.setState({wbsItems: wbsItems, err: undefined});
          } catch (err) {
               this.setState({err: err});
          }
     }

     refreshComponents = async () => {
          try {
               let components = await this.elementDataService.fetchComponents();
               this.setState({components: components, loading: false, err: undefined});
           } catch (err) {
               this.setState({err: err});
          }
     }

     refreshWbsItems = async () => {
          try {
               let wbsItems = await this.elementDataService.fetchWbsItems();
               this.setState({wbsItems: wbsItems, err: undefined});
           } catch (err) {
               this.setState({err: err, loading: false});
          }
     }

     onDbUpdate = async (data: any) => {
          if(this.state.autoRefresh) {
               await this.refreshAll();
          }
     }

     async componentDidMount() {
          // setup socketio
          this.socket.on("dbUpdated", (data: any) => this.onDbUpdate(data));


          try {
               let components = await this.elementDataService.fetchComponents();
               this.setState({components: components, loading: false, err: undefined});
               let wbsItems = await this.elementDataService.fetchWbsItems();
               this.setState({wbsItems: wbsItems, err: undefined});
          } catch (err) {
               console.log(`in componentDidMount ${err}`);
               this.setState({err: err, loading: false});
          }
     }

}


