import { useEffect, useState } from "react";
import { Table, Button, Modal, Input } from "antd";
import type { ColumnsType } from "antd/es/table";

interface IUser {
  email: string;
  _id: string;
  name: string;
  role: string;
}

const columns: ColumnsType<IUser> = [
  {
    title: "Email",
    dataIndex: "email",
    render: (value, record) => {
      return <a>{record.email}</a>;
    },
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "age",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "address",
  },

  //   {
  //     title: "Action",
  //     key: "action",
  //     render: (_, record) => (
  //       <Space size="middle">
  //         <a>Invite {record.name}</a>
  //         <a>Delete</a>
  //       </Space>
  //     ),
  //   },
];

const UsersTable = () => {
  const [listUsers, setListUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const access_token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjUzM2UyZmRkMDUxOGRjNmM2OTU2ZjBlIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE2OTg3NjIwOTUsImV4cCI6MTc4NTE2MjA5NX0.JZtMVFbBCUNiWnGFGGQVxnOZSjhJQx_Yd3O6HdiYEes";
    const res = await fetch("http://localhost:8000/api/v1/users/all", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });
    const d = await res.json();
    setListUsers(d.data.result);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Table Users</h2>
        <div>
          <Button type="primary" onClick={showModal}>
            Add new
          </Button>
        </div>
      </div>
      <Table columns={columns} dataSource={listUsers} rowKey={"_id"} />;
      <Modal
        title="Add new user"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <label>Name:</label>
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <Input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <Input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <label>Age:</label>
          <Input value={age} onChange={(event) => setAge(event.target.value)} />
        </div>
        <div>
          <label>Gender:</label>
          <Input
            value={gender}
            onChange={(event) => setGender(event.target.value)}
          />
        </div>
        <div>
          <label>Address:</label>
          <Input
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>
        <div>
          <label>Role:</label>
          <Input
            value={role}
            onChange={(event) => setRole(event.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
};
export default UsersTable;
