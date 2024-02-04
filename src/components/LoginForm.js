import React, { useState } from "react";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { useContext } from "react";
import { MyContext } from "./Mycontext";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
    date: "",
    status: "",
  });
  const { uid, setUid } = useContext(MyContext);
  const handle = (e) => {
    const tmp = { ...form };
    tmp[e.target.name] = e.target.value;
    setForm(tmp);
  };

  const userexist = (username, keys) => {
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === username) {
        return true;
      }
    }
    return false;
  };

  function login() {
    const db = getDatabase();

    onValue(ref(db, "users"), (snapshot) => {
      const data = snapshot.val();

      const k = Object.keys(data);
      if (userexist(form.username, k)) {
        const pswd = data[form.username].password;
        if (pswd === form.password) {
          alert("Logged in");
          const id = form.username;
          localStorage.setItem("username", form.username);
          setUid(id);
          navigate("/home");
        } else {
          alert("Wrong password");
        }
      } else {
        alert("Username does not exist");
      }
    });
  }
  //bp khaega?
  function signup() {
    const db = getDatabase();
    // onValue(ref(db, 'users'), (snapshot) => {
    //   const data = snapshot.val();
    //     const k = Object.keys(data);
    //   console.log(form.username);
    //     if (userexist(form.username, k)) {
    //       alert('Username already exists');
    //     }
    //     else {
    //       set(ref(db, 'users/' + form.username), {
    //         username: form.username,
    //         password: form.password,
    //       });
    //       alert("account created");
    //     }
    // });
    let fbdata = [];
    onValue(ref(db, "users"), (snapshot) => {
      const data = snapshot.val();
      fbdata = data;
    });
    const currentDate = new Date();
    const k = Object.keys(fbdata);
    if (userexist(form.username, k)) {
      alert("Username already exists");
      return;
    }
    set(ref(db, "users/" + form.username), {
      username: form.username,
      password: form.password,
      date: currentDate.toLocaleDateString(),
      status: "account created",
    });
    alert("account created");
  }

  const styles = {
    container: {
      backgroundColor: "#f0f0f0",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    loginBox: {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      boxSizing: "border-box",
    },
    button: {
      width: "100%",
      padding: "10px",
      borderRadius: "5px",
      border: "none",
      backgroundColor: "#4caf50",
      color: "#fff",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
  };

  return (
    <div style={styles.container}>
      <center>
        <div style={styles.loginBox}>
          <h3>Login Form</h3>
          <div>
            <input
              onChange={(e) => handle(e)}
              placeholder="username"
              name="username"
              type="text"
              style={styles.input}
            />
            <p></p>
            <input
              onChange={(e) => handle(e)}
              placeholder="password"
              name="password"
              type="password"
              style={styles.input}
            />
            <p></p>
            <button onClick={login} style={styles.button}>
              Login
            </button>
            <p></p>
            <button onClick={signup} style={styles.button}>
              Signup
            </button>
          </div>
        </div>
      </center>
    </div>
  );
}

export default LoginForm;