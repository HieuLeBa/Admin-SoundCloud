import { useEffect } from "react";
import { Modal, Input, notification, Form, Select, InputNumber } from "antd";
import { IUser } from "./user.table";
const { Option } = Select;

interface IProps {
  access_token: string;
  getData: any;
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: (v: boolean) => void;
  dataUpdate: null | IUser;
  setDataUpdate: any;
}
const UpdateUserModal = (props: IProps) => {
  const {
    access_token,
    getData,
    isUpdateModalOpen,
    setIsUpdateModalOpen,
    dataUpdate,
    setDataUpdate,
  } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        name: dataUpdate.name,
        email: dataUpdate.email,
        age: dataUpdate.age,
        address: dataUpdate.address,
        role: dataUpdate.role,
        gender: dataUpdate.gender,
      });
    }
  }, [dataUpdate]);

  const handleCloseCreateModal = () => {
    setIsUpdateModalOpen(false);
    setDataUpdate(null);
    form.resetFields();
  };
  const onFinish = async (values: any) => {
    const { name, email, age, gender, role, address } = values;
    if (dataUpdate) {
      const data = {
        _id: dataUpdate?._id,
        name,
        email,
        age,
        gender,
        role,
        address,
      };

      const res = await fetch("http://localhost:8000/api/v1/users", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const d = await res.json();
      if (d.data) {
        await getData();
        notification.success({
          message: "Update Success",
        });
        handleCloseCreateModal();
      } else {
        notification.error({
          message: JSON.stringify(d.message),
          description: "Error",
        });
      }
      setIsUpdateModalOpen(false);
    }
  };
  return (
    <Modal
      title="Update new user"
      open={isUpdateModalOpen}
      onOk={() => form.submit()}
      onCancel={() => handleCloseCreateModal()}
      maskClosable={false}
    >
      <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your username!" }]}
          style={{ marginBottom: 5 }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
          style={{ marginBottom: 5 }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: dataUpdate ? false : true,
              message: "Please input your password!",
            },
          ]}
          style={{ marginBottom: 5 }}
        >
          <Input.Password disabled={dataUpdate ? true : false} />
        </Form.Item>

        <Form.Item
          label="Age"
          name="age"
          rules={[{ required: true, message: "Please input your age!" }]}
          style={{ marginBottom: 5 }}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your address!" }]}
          style={{ marginBottom: 5 }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true }]}
          style={{ marginBottom: 5 }}
        >
          <Select
            placeholder="Select a option and change input text above"
            // onChange={onGenderChange}
            allowClear
          >
            <Option value="MALE">Male</Option>
            <Option value="FEMALE">Female</Option>
            <Option value="OTHER">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true }]}
          style={{ marginBottom: 5 }}
        >
          <Select
            placeholder="Select a option and change input text above"
            // onChange={onGenderChange}
            allowClear
          >
            <Option value="USER">User</Option>
            <Option value="ADMIN">Admin</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default UpdateUserModal;
