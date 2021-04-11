import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Axios from 'axios';
import { Button, TableHead } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import swal from '@sweetalert/with-react'
import './TableMaterial.css';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setLoading } from '../../redux/reducer/LoadingReducer';
import { getAllUsers } from '../../redux/action';
import { deleteUser } from '../../redux/action/AdminAction';


const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

function TableMaterial({ getAllUsersData, deleteUsers, isLoading }) {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    swal({
      title: "Anda Yakin?",
      text: "Anda tidak dapat mengembalikan akun ini jika dihapus",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(async (willDelete) => {
        if (willDelete) {
          console.log(e)
          const res = await deleteUsers(e).catch(err => err);
          if (res.success) {
            swal(res.message, {
              icon: "success",
            }).then((res) => {
              if (res) {
                dispatch(setLoading({
                  isLoading: false
                }))
                location.reload();
              }
            })
          } else {
            swal("Comment Gagal Dihapus", {
              icon: "warning",
            }).then((res) => {
              if (res) {
                dispatch(setLoading({
                  isLoading: false
                }))
                history.push('/dashboard/users');
              }
            })
          }
        } else {
          swal("Commment Tidak dihapus!");
        }
      });
  }
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    async function fetchData() {
      dispatch(setLoading({
        isLoading: false
      }))

      const res = await getAllUsersData().catch(err => err);
      if (res) {
        setRows(res);
      }

    }
    fetchData();
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="center" scope="row">Comment</TableCell>
            <TableCell align="center" scope="row">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row, key) => (
            <TableRow key={key}>
              <TableCell style={{ width: 20 }} scope="row">
                {key + 1}
              </TableCell>
              <TableCell scope="row">
                {row.username}
              </TableCell>
              <TableCell align="left"  scope="row">
                {row.email}
              </TableCell>
              <TableCell align="center" scope="row">
                {row.comment}
              </TableCell>
              <TableCell align="center" scope="row">
                <Button
                  data-id={row.id}
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(row.id)}
                >
                  Delete
              </Button>
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              className="table-pagination"
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={5}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

const reduxState = (state) => ({
  isLoading: state.loading.isLoading,
})

const reduxDispatch = (dispatch) => ({
  getAllUsersData: () => dispatch(getAllUsers()),
  deleteUsers: (data) => dispatch(deleteUser(data)),
})

export default connect(reduxState, reduxDispatch)(withRouter(TableMaterial));