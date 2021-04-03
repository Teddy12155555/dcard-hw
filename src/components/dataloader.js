import React from 'react';
import { Table } from 'react-bootstrap';

import { APItest } from './api';

class DataLoader extends React.Component{
    constructor(props) {
        console.log('Data Loader Init...');
        super(props);
        this.state = {
            height: window.innerHeight,
            index: 0,
            isActive: false,
            SpotsData: []
        };
        this.baseURL = '';
        this.isEnd = false;
        this.handleScroll = this.handleScroll.bind(this);
        window.addEventListener("scroll", this.handleScroll);
    }

    componentDidUpdate(prevProps) {
        
        if (prevProps.url !== this.props.url) {
            this.baseURL = this.props.url;
            this.fetchData(30,0);
        }
    }

    fetchData = (top,skip) => {
        if(!this.isEnd) {
            let url = `${this.baseURL}?$top=${top}&$skip=${skip}&$format=JSON`;
            console.log(`Request from ${url}`);
            APItest(url).then(
            res => {
                console.log('API');
                let temp = res.data;
                if (temp.length === 0 ){
                    
                    return;
                } else if(temp.length < 30) {
                    this.isEnd = true;
                }
                let Spots = this.state.SpotsData;
                for(let i=0;i<temp.length;i++) {
                    // conditional 
                    if (this.baseURL.length <= 10) {
                        Spots.push(
                            <tr key={i + this.state.index + 1}>
                                <td>{i + this.state.index + 1}</td>
                                <td width='15%'>{temp[i]["Name"]}</td>
                                <td>{temp[i]["Description"]}</td>
                            </tr>
                        );
                    } else {
                        Spots.push(
                            <tr key={i + this.state.index + 1}>
                                <td>{i + this.state.index + 1}</td>
                                <td width='15%'>{temp[i]["Name"]}</td>
                                <td>{temp[i]["DescriptionDetail"]}</td>
                            </tr>
                        );
                    }
                    
                }
                this.setState({
                        isActive:true,
                        SpotsData:Spots,
                        index:this.state.index + 30
                    })
                } 
            )
        }else{
        }
    }

    handleScroll() {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            this.fetchData(30, this.state.index);
        }
    }
    
    render() {
        //console.log('Data Render');
        return (this.state.isActive ? 
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.SpotsData}
                    </tbody>
                </Table>
            </div> 
            : (<div>
                    <h1>Loading</h1>
                    <h1>{this.state.routepath}</h1>
                </div>
            ))
    }
}

export { DataLoader };