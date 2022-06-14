import axios from "axios";
import classNames from "classnames";
import { useEffect, useState } from "react";
import DefaultAvatar from "../../assets/body/photo-cover.svg";

export const GetRequestComponent = () => {
  let [users, setUsers] = useState([]);
  let [page, setPage] = useState("");
  let [data, setData] = useState({});

  useEffect(() => {
    const apiUrl =
      "https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6";
    axios
      .get(apiUrl)
      .then((resp) => {
        const person = resp.data;
        setUsers(person.users);
        setPage(person.links.next_url);
        setData(person);
      })
      .catch((err) => console.log(err));
  }, [setUsers]);

  const AddUsers = () => {
    axios.get(page).then((resp) => {
      const person = resp.data;
      setUsers(person.users);
      setPage(person.links.next_url);
      setData(person);
      console.log(person);
    });
  };
  let usersList = users.map((user) => {
    return (
      <div key={user.id} className="users">
        <div className="user__imageBlock">
          <img
            src={user.photo || DefaultAvatar}
            alt="User photo"
            className="user__image"
          />
        </div>
        <div className="users__text userName">{user.name}</div>
        <div className="users__text">{user.position}</div>
        <div className="users__text">{user.email}</div>
        <div className="users__text">{user.phone}</div>
      </div>
    );
  });
  return (
    <div className="bodyContainer" id="users">
      <h2 className="bodyContainer__title">Working with GET request</h2>
      <div className="bodyContainer__users usersContainer">
        {users != {} ? usersList : <div>Users not found</div>}
      </div>
      <div className="buttonSign">
        <button
          className={classNames("headerContainer__buttonText", {
            ["headerContainer__buttonText_disabled"]:
              data.page === data.total_pages,
          })}
          disabled={data.page === data.total_pages}
          onClick={() => {
            AddUsers();
          }}
        >
          Show more
        </button>
      </div>
    </div>
  );
};
