import React, { Component } from 'react';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import axios from 'axios';

import SearchBox from './SearchBox';

class App extends Component {
    state =
        {
            books: [],
            newBookData: {
                bookName: '',
                author: '',
                publisher: ''
            },
            editBookData: {
                id: '',
                bookName: '',
                author: '',
                publisher: ''
            },
            newBookModal: false,
            editBookModal: false,
            searchedBook: ''
        }
    componentWillMount() {
        this._refreshBooks();
    }
    toggleNewBookModal() {
        this.setState({
            newBookModal: !this.state.newBookModal
        })
    }
    addBook() {
        axios.post('http://5e429b37f6128600148ad713.mockapi.io/api/v1/books', this.state.newBookData).then((response) => {
            let { books } = this.state;
            books.push(response.data);
            this.setState({
                books, newBookModal: false,
                newBookData: {
                    bookName: '',
                    author: '',
                    publisher: ''
                }
            });
        });
    }
    editBook(id, bookName, author, publisher) {
        this.setState({
            editBookData: { id, bookName, author, publisher },
            editBookModal: !this.state.editBookModal
        });
    }
    toggleEditBookModal() {
        this.setState({
            editBookModal: !this.state.editBookModal
        })
    }
    updateBook() {
        let { bookName, author, publisher } = this.state.editBookData;
        axios.put('http://5e429b37f6128600148ad713.mockapi.io/api/v1/books/' + this.state.editBookData.id, { bookName, author, publisher }).then((response) => {
            this._refreshBooks();

            this.setState({
                editBookModal: false,
                editBookData: { id: '', bookName: '', author: '', publisher: '' }
            })
        });

    }
    deleteBook(id) {
        axios.delete('http://5e429b37f6128600148ad713.mockapi.io/api/v1/books/' + id).then((response) => {
            this._refreshBooks();
        });
    }
    _refreshBooks() {
        axios.get('http://5e429b37f6128600148ad713.mockapi.io/api/v1/books').then((response) => {
            this.setState({
                books: response.data
            })
        });
    }
    //SEARCHING FOR BOXES:
    handleInput = (e) => {
        console.log(e.target.value);
        this.setState({ searchedBook: e.target.value });
    }
    render() {
        let filteredBooks = this.state.books.filter((book) => {
            return book.bookName.toLowerCase().includes(this.state.searchedBook.toLowerCase()) || book.author.toLowerCase().includes(this.state.searchedBook.toLowerCase()) || book.publisher.toLowerCase().includes(this.state.searchedBook.toLowerCase());
        });

        let books = filteredBooks.map((book) => {
            return (
                <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.bookName}</td>
                    <td>{book.author}</td>
                    <td>{book.publisher}</td>
                    <td>
                        <Button color="warning" size="sm" className="mr-2"
                        >Ayrıntılar</Button>

                        <Button color="success" size="sm" className="mr-2"
                            onClick={this.editBook.bind(this, book.id, book.bookName, book.author, book.publisher)}>Düzenle</Button>

                        <Button color="danger" size="sm"
                            onClick={this.deleteBook.bind(this, book.id)}>Sil</Button>
                    </td>
                </tr>
            )
        })
        return (
            <div className="App container">
                <h1>Online Kitaplık</h1>
                <Button className="my-3" color="primary" onClick={this.toggleNewBookModal.bind(this)}>Kitap Ekle</Button>
                <SearchBox handleInput={this.handleInput} />
                <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)} className={this.props.className}>
                    <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Yeni Bir Kitap Ekle</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="baslik">Kitap Adı</Label>
                            <Input id="baslik" placeholder="Kitap adını giriniz..." value={this.state.newBookData.bookName}
                                onChange={(e) => {
                                    let { newBookData } = this.state;
                                    newBookData.bookName = e.target.value;
                                    this.setState({ newBookData });
                                }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="yazarAdi">Yazar Adı</Label>
                            <Input id="yazarAdi" placeholder="Yazarın adını giriniz..." value={this.state.newBookData.author}
                                onChange={(e) => {
                                    let { newBookData } = this.state;
                                    newBookData.author = e.target.value;
                                    this.setState({ newBookData });
                                }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="yayinEvi">Yayınevi</Label>
                            <Input id="yayinEvi" placeholder="Yayınevinin adını giriniz..." value={this.state.newBookData.publisher}
                                onChange={(e) => {
                                    let { newBookData } = this.state;
                                    newBookData.publisher = e.target.value;
                                    this.setState({ newBookData });
                                }} />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.addBook.bind(this)}>Ekle</Button>{' '}
                        <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Çıkış</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditBookModal.bind(this)} className={this.props.className}>
                    <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Bu Kitabı Düzenleyin</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="baslik">Kitap Adı</Label>
                            <Input id="baslik" placeholder="Kitap adını giriniz..." value={this.state.editBookData.bookName}
                                onChange={(e) => {
                                    let { editBookData } = this.state;
                                    editBookData.bookName = e.target.value;
                                    this.setState({ editBookData });
                                }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="yazarAdi">Yazar Adı</Label>
                            <Input id="yazarAdi" placeholder="Yazarın adını giriniz..." value={this.state.editBookData.author}
                                onChange={(e) => {
                                    let { editBookData } = this.state;
                                    editBookData.author = e.target.value;
                                    this.setState({ editBookData });
                                }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="yayinEvi">Yayınevi</Label>
                            <Input id="yayinEvi" placeholder="Yayınevinin adını giriniz..." value={this.state.editBookData.publisher}
                                onChange={(e) => {
                                    let { editBookData } = this.state;
                                    editBookData.publisher = e.target.value;
                                    this.setState({ editBookData });
                                }} />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.updateBook.bind(this)}>Güncelle</Button>{' '}
                        <Button color="secondary" onClick={this.toggleEditBookModal.bind(this)}>Çıkış</Button>
                    </ModalFooter>
                </Modal>

                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Başlık</th>
                            <th>Yazar</th>
                            <th>Yayınevi</th>
                            <th>Seçenekler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books}
                    </tbody>
                </Table >
            </div >
        );
    }

}

export default App;