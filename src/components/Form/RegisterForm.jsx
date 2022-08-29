import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../../configApi";
import { FIELD_FORM } from "../../constants";
import { callApi } from "./callApi";

function RegisterForm() {
  const [password, setPassword] = useState({
    value: "",
    isShowPass: false,
    isTouch: false,
    isError: false,
    messageError: "",
  });

  const [email, setEmail] = useState("");

  //handle function setEmail and password
  const onChangePass = (event) => {
    //get value of event
    const value = event.target.value;
    setPassword((pre) => ({
      ...pre,
      value,
    }));
  };

  const onChangeEmail = (event) => {
    //get value of event
    const value = event.target.value;
    setEmail((pre) => (pre = value));
  };

  //handle function which update every state
  const onType = (event) => {
    /**
     *
     * event: {event: {target: {value}}}
     */
    const { value, name } = event.target;
    console.log(value, name);
    if (name === FIELD_FORM.EMAIL) {
      setEmail((pre) => (pre = value));
    } else if (name === FIELD_FORM.PASSWORD) {
      if (value) {
        return setPassword((pre) => ({
          ...pre,
          isTouch: true,
          value,
          isError: false,
          messageError: "",
        }));
      }
      return setPassword((pre) => ({
        ...pre,
        isTouch: true,
        value,
        isError: true,
        messageError: "password is not empty",
      }));
    }
  };

  const onShowPass = (event) => {
    //get checked value
    const checked = event.target.checked;
    setPassword((pre) => ({
      ...pre,
      isShowPass: !pre.isShowPass,
    }));

    //c2
    // setPassword((pre) => ({
    //     ...pre,
    //     isShowPass: checked,
    //   }));
  };

  //function to process submit
  const onSubmit = (event) => {
    event.preventDefault();
    if (password.isTouch && !password.value) {
      setPassword((pre) => ({
        ...pre,
        isError: true,
        messageError: "Password is not empty",
      }));
    }

    if (email && password.value) {
      //call api
      callApi(email, password.value);
    }
  };

  const validation = (field, str) => {
    if (field === FIELD_FORM.PASSWORD) {
      if (password.isTouch && !password.value) {
        return <Form.Text style={{ color: "red" }}>{str}</Form.Text>;
      }
    }
  };

  useEffect(() => {
    console.log("email", email);
    console.log("pass", password);
  }, [email, password.isShowPass, password.value]);

  return (
    <Form onSubmit={(event) => onSubmit(event)}>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          name={FIELD_FORM.EMAIL}
          required
          type='email'
          placeholder='Enter email'
          defaultValue={email}
          onChange={(event) => onType(event)}
          //   onBlur={validation(email, "Email is not empty")}
        />
        {validation("email", "Email is not empty")}
        <br />
        <Form.Text className='text-muted'>
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className='mb-3' controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          name={FIELD_FORM.PASSWORD}
          required
          type={`${password.isShowPass ? "text" : "password"}`}
          placeholder='Password'
          defaultValue={password.value}
          onChange={(event) => onType(event)}
          onFocus={() => {
            setPassword((pre) => ({
              ...pre,
              isTouch: true,
            }));
          }}
        />
        {/* {validation("password", "Password is not empty")} */}
        {password.isError && password.isTouch && (
          <Form.Text style={{ color: "red" }}>
            {password.messageError}
          </Form.Text>
        )}
      </Form.Group>
      <Form.Group className='mb-3' controlId='formBasicCheckbox'>
        <Form.Check
          type='checkbox'
          label='show password'
          defaultChecked={password.isShowPass}
          onClick={(event) => onShowPass(event)}
        />
      </Form.Group>
      <Button
        variant='primary'
        type='submit'
        // onClick={(event) => onSubmit(event)}
      >
        Submit
      </Button>
    </Form>
  );
}

export default RegisterForm;
