import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap'
import DatePicker from 'react-date-picker';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import Swal from 'sweetalert2';
import axios from 'axios';

export default class DataTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entities: {
        data: [],
        meta: {
          current_page: 1,
          from: 1,
          last_page: 1,
          per_page: 5,
          to: 1,
          total: 1,
        },
      },
      first_page: 1,
      current_page: 1,
      sorted_column: this.props.columns[0],
      offset: 4,
      order: 'asc',
      editModal: false,
      userToEdit: {},
      userPermissions: []
    };
  }

  fetchEntities() {
    let fetchUrl = `${this.props.url}/?page=${this.state.current_page}&column=${this.state.sorted_column}&order=${this.state.order}&per_page=${this.state.entities.meta.per_page}`;
    axios.get(fetchUrl)
      .then(response => {
          this.setState({ entities: response.data });
      })
      .catch(e => {
        console.error(e);
      });
  }

  changePage(pageNumber) {
    this.setState({ current_page: pageNumber }, () => {this.fetchEntities()});
  }

  columnHead(value) {
    return value.split('_').join(' ').toUpperCase()
  }

  pagesNumbers() {
    if (!this.state.entities.meta.to) {
      return [];
    }
    let from = this.state.entities.meta.current_page - this.state.offset;
    if (from < 1) {
      from = 1;
    }
    let to = from + (this.state.offset * 2);
    if (to >= this.state.entities.meta.last_page) {
      to = this.state.entities.meta.last_page;
    }
    let pagesArray = [];
    for (let page = from; page <= to; page++) {
      pagesArray.push(page);
    }
    return pagesArray;
  }

  can(permission) {
    if (!this.state.userPermissions) {
      return
    }
    return this.state.userPermissions.find((p) => p.name == permission) ? true : false
  }

  componentDidMount() {
    this.setState({ current_page: this.state.entities.meta.current_page }, () => {this.fetchEntities()});
    this.setState({ userPermissions: JSON.parse(localStorage.getItem('userPermissions')) })
  }

  tableHeads() {
    let icon;
    if (this.state.order === 'asc') {
      icon = <i className="fas fa-arrow-up"></i>;
    } else {
      icon = <i className="fas fa-arrow-down"></i>;
    }
    return this.props.columns.map(column => {
      return <th className="table-head" key={column} onClick={() => this.sortByColumn(column)}>
        { this.columnHead(column) }
        { column === this.state.sorted_column && icon }
      </th>
    });
  }

  submitEdit() {
    this.setState({ editModal: false, userToEdit: {} })

    axios.put(this.props.url, this.state.userToEdit)
      .then(data => {
        Swal.fire(
          'Update Success',
          'Data user berhasil diupdate!',
          'success'
        ).then((result) => {
          window.location.reload();
        })
      })
      .catch(e => {
        console.log(e)
        Swal.fire(
          'Update Failed',
          'Failed to update user',
          'error'
        )
      })
  }

  deleteData(id) {
    Swal.fire({
      title: 'Are you sure want to delete this user?',
      showCancelButton: true,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(this.props.url + '/' + id)
          .then(data => {
            Swal.fire(
              'Delete success',
              'Success to delete user',
              'success'
            ).then(result => {
              window.location.reload()
            })
          })
          .catch(e => {
            console.log(e)
            Swal.fire(
              'Delete Failed',
              'Failed to delete user',
              'error'
            )
          })
      }
    })
  }

  userList() {
    if (this.state.entities.data.length) {
      return this.state.entities.data.map(user => {
        return (
          <>
            <Modal show={this.state.editModal} onHide={() => this.setState({ editModal: false, userToEdit: {} })}>
              <Modal.Header closeButton>
                <Modal.Title>Edit User { this.state.userToEdit.id }</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <div>
                    <Label forInput="name" value="Name" />

                    <Input
                        type="text"
                        name="name"
                        value={this.state.userToEdit.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        required
                        handleChange={(e) => this.setState({ userToEdit: {...this.state.userToEdit, name: e.target.value} })}
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="email" value="Email" />

                    <Input
                        type="email"
                        name="email"
                        value={this.state.userToEdit.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        required
                        handleChange={(e) => this.setState({ userToEdit: {...this.state.userToEdit, email: e.target.value} })}
                    />
                </div>

                <div className="mt-4 radio-buttons">
                  <Label forInput="gender" value="Gender" />

                  <input
                    id="male"
                    value="male"
                    name="gender"
                    type="radio"
                    required={!this.state.userToEdit.gender}
                    checked={this.state.userToEdit.gender == 'male'}
                    onChange={(e) => this.setState({ userToEdit: {...this.state.userToEdit, gender: e.target.value} })}
                  />
                  Male

                  <input
                    id="female"
                    value="female"
                    name="gender"
                    type="radio"
                    required={!this.state.userToEdit.gender}
                    checked={this.state.userToEdit.gender == 'female'}
                    onChange={(e) => this.setState({ userToEdit: {...this.state.userToEdit, gender: e.target.value} })}
                  />
                  Female
                </div>

                <div className="mt-4">
                  <Label forInput="birthplace" value="Birthplace" />

                  <Input
                    type="text"
                    name="birthplace"
                    value={this.state.userToEdit.birthplace}
                    className="mt-1 block w-full"
                    required
                    handleChange={(e) => this.setState({ userToEdit: {...this.state.userToEdit, birthplace: e.target.value} })}
                  />
                </div>

                <div className="mt-4">
                  <Label forInput="birthday" value="Birthday" />

                  <DatePicker onChange={(val) => this.setState({ userToEdit: {...this.state.userToEdit, birthdate: val} })} value={this.state.userToEdit.birthdate ? new Date(this.state.userToEdit.birthdate) : new Date()} required format='dd-MM-y'/>
                </div>

                <div className="mt-4">
                    <Label forInput="password" value="Password" />

                    <Input
                        type="text"
                        name="password"
                        value={this.state.userToEdit.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        required
                        handleChange={(e) => this.setState({ userToEdit: {...this.state.userToEdit, password: e.target.value} })}
                    />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => this.setState({ editModal: false, userToEdit: {} })}>
                  Close
                </Button>
                <Button variant="primary" onClick={() => this.submitEdit()}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>

            <tr key={ user.id }>
              {Object.keys(user).map(key => <td key={key}>{ user[key] }</td>)}
              <td class="btn-group" role="group" aria-label="Actions">
                {this.can('edit user')
                  ? <button type="button" class="btn btn-primary" onClick={() => this.setState({ editModal: true, userToEdit: user })}>Edit</button>
                  : ''
                }
                {
                  this.can('delete user')
                   ? <button type="button" class="btn btn-danger" onClick={() => this.deleteData(user.id)}>Delete</button>
                   : ''
                }
              </td>
            </tr> 
          </>
        )
      })
    } else {
      return <tr>
        <td colSpan={this.props.columns.length} className="text-center">No Records Found.</td>
      </tr>
    }
  }

  sortByColumn(column) {
    if (column === this.state.sorted_column) {
      this.state.order === 'asc' ? this.setState({ order: 'desc', current_page: this.state.first_page }, () => {this.fetchEntities()}) : this.setState({ order: 'asc' }, () => {this.fetchEntities()});
    } else {
      this.setState({ sorted_column: column, order: 'asc', current_page: this.state.first_page }, () => {this.fetchEntities()});
    }
  }

  pageList() {
    return this.pagesNumbers().map(page => {
      return <li className={ page === this.state.entities.meta.current_page ? 'page-item active' : 'page-item' } key={page}>
        <button className="page-link" onClick={() => this.changePage(page)}>{page}</button>
      </li>
    })
  }

  render() {
    return (
      <div className="data-table">
        <table className="table table-bordered">
          <thead>
            <tr>{ this.tableHeads() }</tr>
          </thead>
          <tbody>{ this.userList() }</tbody>
        </table>
        { (this.state.entities.data && this.state.entities.data.length > 0) &&
          <nav>
            <ul className="pagination">
              <li className="page-item">
                <button className="page-link"
                  disabled={ 1 === this.state.entities.meta.current_page }
                  onClick={() => this.changePage(this.state.entities.meta.current_page - 1)}
                >
                  Previous
                </button>
              </li>
              { this.pageList() }
              <li className="page-item">
                <button className="page-link"
                  disabled={this.state.entities.meta.last_page === this.state.entities.meta.current_page}
                  onClick={() => this.changePage(this.state.entities.meta.current_page + 1)}
                >
                  Next
                </button>
              </li>
              <span style={{ marginTop: '8px' }}> &nbsp; <i>Displaying { this.state.entities.data.length } of { this.state.entities.meta.total } entries.</i></span>
            </ul>
          </nav>
        }
      </div>
    );
  }
}