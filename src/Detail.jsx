import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import Axios from 'axios';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Route from 'react-router-dom/Route';

import App from './App';

class Detail extends Component {

    state = {
        id: '',
        bookNameDetail: '',
        authorNameDetail: '',
        publisherNameDetail: ''
    }
    componentDidMount() {

        let id = this.props.match.params.id;
        console.log(id);

        Axios.get('http://5e429b37f6128600148ad713.mockapi.io/api/v1/books/' + id).then(res => {
            console.log(res.data.author);
            this.setState(
                {
                    id: res.data.id,
                    bookNameDetail: res.data.bookName,
                    authorNameDetail: res.data.author,
                    publisherNameDetail: res.data.publisher
                }
            )
        });
    }
    render() {
        return (
            <Router>
                <div className='container'>
                    <Route path="/detail/:id" exact strict>
                        <h1>Ayrıntı sayfası</h1>
                        <tr>

                        </tr>
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Başlık</th>
                                    <th>Yazar</th>
                                    <th>Yayınevi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <td>{this.state.id}</td>
                                <td>{this.state.bookNameDetail}</td>
                                <td>{this.state.authorNameDetail}</td>
                                <td>{this.state.publisherNameDetail}</td>
                            </tbody>
                        </Table >
                        <Button color="primary"><Link to="/" style={{ color: '#FFF' }}>Anasayfaya Dön</Link></Button>
                    </Route>
                    <Route path="/" exact strict>
                        <App />
                    </Route>

                </div>
            </Router>

        )
    }
}

export default Detail;