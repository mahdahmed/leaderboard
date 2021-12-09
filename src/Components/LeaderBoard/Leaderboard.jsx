import React, { useState, useEffect } from "react";
import "./LeaderBoard.css";
import DataTable from 'react-data-table-component';

function Leaderboard() {
  const data = [
    { id: 1, name: "Fahad", location: "Khi", date: "2021-12-08", unit: 12, type: "Running", points: 12 },
    { id: 2, name: "Ali", location: "Lhr", date: "2021-11-07", unit: 20, type: "cycling", points: 15 },
    { id: 3, name: "Rizwan", location: "Isb", date: "2021-10-06", unit: 11, type: "Running", points: 16 },
  ];
  const [list, setList] = useState(data);
  const [name, setName] = useState("");
  const [loc, setLoc] = useState("");
  const [date, setDate] = useState("");
  const [unit, setUnit] = useState("");
  const [type, setType] = useState("");
  const [points, setPoints] = useState("");
  const [edit, setEdit] = useState(false);
  const [updateID, setUpdateID] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    getdate();
    setTimeout(() => {
      setErr("");
      setMsg("");
    }, 4000);
  }, [err,msg]);
  //date function
  const getdate = () => {
    const date = new Date();
    setDate(
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2)
    );
  };
  //add new Records in obj
  const addPerson = () => {
    const newdata = {
      id: list.length + 1,
      name: name,
      location: loc,
      date: date,
      unit: unit, type: type, points: points
    };
    if(name && loc && date && unit && type && points)
    {
      setList((data) => {
        return [...data, newdata];
      });
      cancelclouser();
      setMsg("record added successuly...!");
    }
    else
    {
      setErr("all feilds are required...!");
    }
    
  };
  //fetch user info by id
  const editperson = (id) => {
    var editdata = list.filter((person) => {
      return person.id === id;
    });
    setUpdateID(editdata[0].id);
    setName(editdata[0].name);
    setLoc(editdata[0].location);
    setDate(editdata[0].date);
    setUnit(editdata[0].unit);
    setType(editdata[0].type);
    setPoints(editdata[0].points);
    setEdit(true);
    setMsg("record fetched successully...!")
  };
  //update record acc to id
  const update = () => {
    if(name && loc && date && unit && type && points)
    {
    setList(
      list.map((curElem) => {
        if (curElem.id === updateID) {
          return { ...curElem, name: name, location: loc, date: date,unit: unit, type: type, points: points };
        }
        return curElem;
      })
    );
    cancelclouser();
    setMsg("record updated succeessully");
    }
    else
    {
      setErr("all feilds are required...!");
    }
  };
  //delete reecord acc to id
  const deleteperson = (id) => {
    var cnfrm = window.confirm("Are You Sure You Want to delete This??");
    if (cnfrm) {
      setList(
        list.filter((person) => {
          return person.id !== id;
        })
      );
    }
  };
  //reset form after submission
  const cancelclouser = (id) => {
    setUpdateID("");
    setName("");
    setLoc("");
    getdate();
    setUnit("");
    setType("");
    setPoints("");
    setEdit(false);
  };

  //datatable object
  const columns = [
    {
      name: 'S.No',
      sortable: true,
      maxWidth: "50px",
      cell: (row, index, column, id) => {
        return (
          <>
            {index + 1}
          </>
        )
      }
    },
    {
      name: 'Player Name',
      selector:row=> row?.name,
      sortable: true,
    },

    {
      name: 'Location',
      selector:row=> row?.location,
      sortable: true,
      
    },
    {
      name: 'Date(yy-mm-dd)',
      selector:row=> row?.date,
      sortable: true,
    },
    {
      name: 'Units (km)',
      selector: row=>row?.unit,
      sortable: true,
    },
    {
      name: 'Type',
      selector: row=>row?.type,
      sortable: true,
    },
    {
      name: 'Points',
      selector: row=>row?.points,
      sortable: true,
    },
    {
      name: 'Action',
      maxWidth: "140px",
      cell: (row) => {
        return (
          <div className="w-100 d-flex flex-md-wrap justify-content-around">

            <button
              title="Edit"
              type="button"
              className="btn btn-outline-success  px-3"
              onClick={() => editperson(row.id)}
            >
              <i className="fa fa-pencil" aria-hidden="true"></i>
            </button>
            <button
              title="Delete"
              type="button"
              className="btn btn-outline-dark px-3"
              onClick={() => deleteperson(row.id)}
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </button></div>

        )

      }
    },
  ];
 
  return (
    <div className="bg-light p-5">
      <h2 className="text-center text-decoration-underline">LeaderBoarrd</h2>
      <div className="card w-75  mx-auto">
        {edit?<h6 className="text-center text-info pt-3">Update Record...</h6>:
        <h6 className="text-center text-primary pt-3">Add New Record...</h6>}
        <div className="d-flex justify-content-center">
          <form>
            <div className="row px-4">
              <div className="col-sm-12 col-md-4 py-2">
                <label className="form-label">Name</label>
                <input
                  className="form-control"
                  value={name}
                  type="text"
                  placeholder="Enter Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-sm-12 col-md-4 py-2">
                <label className="form-label">Location</label>
                <input
                  className="form-control"
                  value={loc}
                  type="text"
                  placeholder="Enter Location"
                  onChange={(e) => setLoc(e.target.value)}
                />
              </div>
              <div className="col-sm-12 col-md-4 py-2">
                <label className="form-label">Date</label>
                <input
                  className="form-control"
                  value={date}
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="col-sm-12 col-md-4 py-2">
                <label className="form-label">Units</label>
                <input
                  className="form-control"
                  value={unit}
                  type="number"
                  placeholder="Enter Units"
                  onChange={(e) => setUnit(e.target.value)}
                />
              </div>
              <div className="col-sm-12 col-md-4 py-2">
                <label className="form-label">Type</label>
                <input
                  className="form-control"
                  value={type}
                  type="text"
                  placeholder="Enter Type"
                  onChange={(e) => setType(e.target.value)}
                />
              </div>
              <div className="col-sm-12 col-md-4 py-2">
                <label className="form-label">Points</label>
                <input
                  className="form-control"
                  value={points}
                  type="number"
                  placeholder="Enter Points"
                  onChange={(e) => setPoints(e.target.value)}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="d-flex justify-content-center p-3">
          {edit ? (
            <>
              <button className="btn btn-outline-success px-md-5" onClick={update}>
                Update
              </button>
              <button
                className="btn btn-outline-danger px-md-5 mx-2"
                onClick={cancelclouser}
              >
                Cancel
              </button>
            </>
          ) : (
              <button
                className="btn btn-outline-success px-5 "
                onClick={addPerson}
              >
                Add Record
              </button>
            )}
        </div>
        {err? <p className="fw-bold text-center text-danger text-capitalize">{err}</p>:null}
        {msg? <p className="fw-bold text-center text-success text-capitalize">{msg}</p>:null}
      </div>
      <div className="card mt-4">
        <DataTable
          columns={columns}
          data={list}
          pagination={true}
          striped={true}
          fixedHeader={true}
          highlightOnHover
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
        />
      </div>
    </div>
  );
}

export default Leaderboard;
