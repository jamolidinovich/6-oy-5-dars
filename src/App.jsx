import "./App.css";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useState } from "react";
// import trash from "./assets/trash3.svg";
function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [jins, setJins] = useState("Erkak");
  const [desc, setDesc] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [UpdateId, setUpdateId] = useState("");
  const [isupdate, setIsupdate] = useState(false);
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")));
  function getData() {
    let data = [];
    if (localStorage.getItem("todos")) {
      data = JSON.parse(localStorage.getItem("todos"));
    }
    return data;
  }
  function handleClick(e) {
    e.preventDefault();
    const obj = {
      id: Date.now(),
      name: name,
      age: age,
      jins: jins,
      desc: desc,
      email: email,
      pass: pass,
      visible: false,
    };
    let old = getData();
    old.push(obj);
    localStorage.setItem("todos", JSON.stringify(old));
    setTodos(JSON.parse(localStorage.getItem("todos")));
    setAge("");
    setDesc("");
    setJins("");
    setName("");
    setEmail("");
    setPass("");
  }
  function handleDelet(item) {
    let isDelet = confirm("Rostan ham o'chirmoqchimisz?");
    if (isDelet) {
      let copied = JSON.parse(JSON.stringify(todos));
      copied = copied.filter((el) => {
        return el.id != item.id;
      });
      // console.log(copied);
      localStorage.setItem("todos", JSON.stringify(copied));
      setTodos(copied);
    }
  }
  function handleShow(order, el) {
    // console.log(order);
    let copied = JSON.parse(JSON.stringify(todos));

    copied = copied.map((ell) => {
      if (ell.id == el.id && order == "show") {
        el.visible = true;
      }
      if (ell.id == el.id && order == "hide") {
        el.visible = false;
      }
      setTodos(copied);

      return ell;
    });
  }
  function handleupdate() {}
  function handleupdateItem(todos) {
    setAge(todos.age);
    setDesc(todos.desc);
    setJins(todos.jins);
    setName(todos.name);
    setEmail(todos.email);
    setPass(todos.pass);
    setIsupdate(true);
    setUpdateId(todos.id);
  }
  return (
    <>
      <div className="container">
        <div className="form-container">
          <form onSubmit={handleClick} className="form">
            <div className="form-group">
              <label htmlFor="name">Enter name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                name="name"
                required=""
              />
              <label htmlFor="age">Enter age</label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                }}
                name="age"
                required=""
              />

              <label htmlFor="email">Enter email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                name="name"
                required=""
              />
              <label htmlFor="password">Enter password</label>
              <input
                type="password"
                id="password"
                value={pass}
                onChange={(e) => {
                  setPass(e.target.value);
                }}
                name="password"
                required=""
              />

              <select
                className="jins"
                value={jins}
                onChange={(e) => {
                  setJins(e.target.value);
                }}
              >
                <option value="">Jins</option>
                <option value="erkak">Erkak</option>
                <option value="ayol">Ayol</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="textarea">How Can We Help You?</label>
              <textarea
                name="textarea"
                id="textarea"
                rows="10"
                cols="50"
                required=""
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              ></textarea>
            </div>
            {!isupdate && (
              <button
                onClick={handleClick}
                className="form-submit-btn"
                type="submit"
              >
                Submit
              </button>
            )}
            {isupdate && (
              <button
                onClick={handleupdate}
                className="form-submit-btn"
                type="submit"
              >
                Update
              </button>
            )}
          </form>
        </div>

        <div className="jadval">
          <table className="table table-dark table-striped">
            <thead className="thead">
              <tr>
                <th className="th">№</th>
                <th>Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>Password</th>
                <th>Gender</th>
                <th>Description</th>
                <th>Edit</th>
                <th>Delet</th>
              </tr>
            </thead>
            {todos &&
              todos.map((el, i) => {
                return (
                  <tbody key={i} className="tbody">
                    <tr>
                      <td>{i + 1}</td>
                      <td>{el.name}</td>
                      <td>{el.age}</td>
                      <td>{el.email}</td>
                      <th
                        style={{
                          color: "#717171",
                          cursor: "pointer",
                        }}
                      >
                        {el.visible ? el.pass : "***"}
                        {el.visible ? (
                          <FaEye
                            style={{ marginLeft: "10px" }}
                            onClick={() => {
                              handleShow("hide", el);
                            }}
                          />
                        ) : (
                          <FaEyeSlash
                            style={{ marginLeft: "10px" }}
                            onClick={() => {
                              handleShow("show", el);
                            }}
                          />
                        )}
                        {/* <FaEyeSlash />
                        <FaEye /> */}
                      </th>
                      <td>{el.jins}</td>

                      <td>{el.desc}</td>

                      <td style={{ cursor: "pointer" }}>
                        <svg
                          onClick={() => {
                            handleupdateItem(todos);
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-pencil"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                        </svg>
                      </td>
                      <th style={{ cursor: "pointer" }}>
                        <span
                          onClick={() => {
                            handleDelet(el);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-trash3"
                            viewBox="0 0 16 16"
                          >
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                          </svg>
                        </span>
                      </th>
                    </tr>
                  </tbody>
                );
              })}
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
