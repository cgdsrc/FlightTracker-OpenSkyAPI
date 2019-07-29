import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import loadinggif from './images/2.gif'

class TableComponent extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
            response: false,
            endpoint: "http://127.0.0.1:4000"
        };
    }
    componentDidMount() {
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        console.log("didmount");
        socket.on("getflight", data => {
            console.log(data);
            this.setState({ response: data })

        });
        socket.on('connect_failed', function(){
            this.setState({ error: true })
        });

        socket.on('disconnect', function () {
          console.log('Disconnected');
        });
    }
    renderTableData = () => {
        console.log(this.state);

        if (this.state.response !== false) {
            return this.state.response.map((flight, index) => {
                if(flight[8]==true || flight[8]==null){
                return (
                   <tr key={flight[0]}>
                        <td>{flight[1]}</td> 
                        <td>{flight[2]}</td>
                        <td>{flight[9]}</td>   
                        <td>Uçuş tamamlandı</td>
                    </tr>
               
                )}
                else{
                return (
                    <tr key={flight[0]}>
                         <td>{flight[1]}</td> 
                         <td>{flight[2]}</td>
                         <td>{flight[9]}</td>   
                         <td>Uçuş devam ediyor</td>
                     </tr>
                
                 )}

            });
        }
    }
 
    render() {
        return (
            <div>
                {this.state.response == false 
                ?  <div style={{ marginTop: "center"} }><img src={loadinggif} /></div> 

                : <div> <h1 id='title'>Uçuş Takip Sistemi</h1><table id='flight'>
                        <tbody>
                            <th>Çağrı Kodu</th>
                            <th>Menşei Ülke</th>
                            <th>Hız</th>
                            <th>Durum</th>
                            {this.renderTableData()}
                        </tbody>
                    </table>
                 </div>
                 }
            </div>
        )
    }
}
export default TableComponent;