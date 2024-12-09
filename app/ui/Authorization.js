// import {NavLink, Offcanvas, Nav} from "react-bootstrap";
// import React, {useState} from "react";
// import Form from "react-bootstrap/Form";
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
// import Button from 'react-bootstrap/Button';
// import {Auth, CheckValidationPassword} from "../api/auth";
// import {Registration} from "../api/registration";
// import {useDispatch, useSelector} from "react-redux";
// import {changeCanvas} from "../slices/appCommonSlice";
// import {PatternFormat} from "react-number-format";
// import clsx from "clsx";
// import {useNavigate} from "react-router-dom";
// import "react-datepicker/dist/react-datepicker.css";
// import {DatePickerField} from "./account/AccountInfo";
// import moment from "moment/moment";
// import {useFormik} from "formik";
//
//
// const Authorization = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const [authMode, setAuthMode] = useState(true);
//     const [phone, setPhone] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [birthday, setBirthday] = useState('');
//     const [name, setName] = useState('');
//     const [surname, setSurname] = useState('');
//
//     const [changeBirthdayDate, setChangeBirthdayDate] = useState(new Date());
//
//     const [errorForm, setErrorForm] = useState({
//         name: false,
//         surname: false,
//         phone: false,
//         email: false,
//         password: false,
//         birthday: false,
//     });
//     const [validationPassword, setValidationPassword] = useState(false);
//     const [validationPasswordValue, setValidationPasswordValue] = useState('');
//     const [repeatRequestPassword, setRepeatRequestPassword] = useState(false);
//
//
//     let clientId;
//     const tempClient = localStorage.getItem("temp-client");
//     const client = JSON.parse(localStorage.getItem("client"));
//     if (client) {
//         clientId = client.id;
//     }
//
//     const show = useSelector((state) => state.common.canvasOnShow);
//
//     const classes = {
//         address: clsx({'form-text': true},
//             {'is-invalid': errorForm.address},
//         ),
//         region: clsx({'form-select': true},
//             {'is-invalid': errorForm.region},
//         ),
//         city: clsx({'form-select': true},
//             {'is-invalid': errorForm.city},
//         ),
//         phone: clsx({'form-control': true},
//             {'is-invalid': errorForm.phone},
//         )
//     };
//
//
//     const checkClient = async () => {
//         if (clientId || tempClient) {
//             const result = await Auth({email: email, password: password});
//             // console.log('TOKEN RESPONSE', result);
//
//             if (result.data?.accessToken) {
//                 localStorage.setItem('client', JSON.stringify(result.data));
//                 localStorage.removeItem('temp-client');
//                 window.location.replace('/home');
//             }
//         }
//
//             // if (tempClient) {
//             //     console.log('i dont know who you are')
//         // }
//         else {
//             alert('No token')
//         }
//     }
//
//     const registerClient = async () => {
//         const formikErrors = formik.errors;
//         // console.log('formikErrors', formikErrors)
//
//         if (Object.keys(formikErrors).length > 0) {
//             console.log('Заполните все поля');
//             return false;
//         }
//         try {
//             const result = await Registration(
//                 {
//                     name: formik.values.name,
//                     surname: formik.values.surname,
//                     phone: formik.values.phone,
//                     email: formik.values.email,
//                     password: formik.values.password,
//                     birthday: formik.values.birthday,
//                     tempClientToken: tempClient,
//                 });
//
//             if (result.success === true) {
//                 setValidationPassword(true);
//                 console.log("Проверьте свою почту для активации аккаунта.");
//             } else {
//                 console.log("Что-то пошло не так. Попробуйте еще раз.")
//             }
//         } catch (error) {
//             console.error("Ошибка при регистрации:", error);
//             console.log("Произошла ошибка при регистрации. Попробуйте еще раз.");
//         }
//     }
//
//     const handlePhoneChange = (values) => {
//         setPhone(7 + values.value);
//     }
//
//     const validate = (values) => {
//         let errors = {};
//
//         if (!values.name || values.name.trim().length < 2) {
//             errors.name = 'Имя должно содержать минимум 2 символа.';
//             // console.log(errors.name);
//         }
//         if (!values.surname || values.surname.trim().length < 2) {
//             errors.surname = 'Фамилия должна содержать минимум 2 символа.';
//             // console.log(errors.surname);
//         }
//         if (values.phone.length < 10) {
//             errors.phone = 'Номер телефона слишком короткий.';
//             // console.log(errors.phone);
//         }
//         if (!values.email || values.email.trim().length < 5) {
//             errors.email = 'E-mail должен содержать минимум 5 символов.';
//             // console.log(errors.email);
//         }
//         if (!values.password || values.password.trim().length < 6) {
//             errors.password = 'Пароль должен содержать минимум 6 символов.';
//             // console.log(errors.password);
//         }
//         if (values.birthday.trim().length < 10) {
//             errors.birthday = 'Дата рождения должна содержать минимум 8 символов.';
//             // console.log(errors.birthday);
//         }
//         return errors;
//     }
//
//     const formik = useFormik({
//         enableReinitialize: true,
//         validate,
//         initialValues: {
//             name: 'mary',
//             surname: 'gon',
//             phone: '73494855345',
//             email: '',
//             password: '345rtet',
//             birthday: moment().format('YYYY-MM-DD'),
//         },
//         onSubmit: (values) => {
//             console.log(JSON.stringify(values, null, 2));
//         }
//     })
//     // console.log('formik',formik);
//
//     const checkValidationPassword = async () => {
//         try {
//             const result = await CheckValidationPassword({
//                 email: formik.values.email,
//                 generatedPassword: validationPasswordValue,
//                 name: formik.values.name,
//                 surname: formik.values.surname,
//                 phone: formik.values.phone,
//                 password: formik.values.password,
//                 birthday: formik.values.birthday,
//                 tempClientToken: tempClient,
//             })
//             if (result.success === true) {
//                 setValidationPassword(false);
//                 console.log('вы зарегистрированы');
//
//                 const authMode = await Auth({email: formik.values.email, password: formik.values.password});
//
//                 if (authMode.success) {
//                     setValidationPassword(true);
//                 }
//                 if (authMode.success) {
//                     localStorage.removeItem('temp-client');
//                     localStorage.setItem('client', JSON.stringify(authMode.data));
//                     // window.location.reload();
//                     // navigate('/home');
//                 }
//                 await dispatch(changeCanvas(false));
//             } else if (result.success === false && result.status === 403) {
//                 console.log('Неправильный пароль');
//                 setValidationPassword(false);
//                 setValidationPasswordValue('');
//                 setRepeatRequestPassword(true);
//             }
//         } catch (error) {
//             // console.log('Неправильный пароль');
//             console.log(error);
//         }
//     }
//
//
//     return (
//         <>
//             {
//                 authMode ?
//                     <Offcanvas show={show} onHide={() => dispatch(changeCanvas(false))} placement={"end"}>
//                         <Offcanvas.Header closeButton>
//                             <Offcanvas.Title>Вход</Offcanvas.Title>
//                         </Offcanvas.Header>
//                         <Offcanvas.Body>
//                             <Form>
//                                 <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
//                                     <Form.Label column sm="2">
//                                         Email
//                                     </Form.Label>
//                                     <Col sm="10">
//                                         <Form.Control value={email}
//                                                       type={'email'}
//                                                       required
//                                                       onChange={(e) => setEmail(e.target.value)}
//                                         />
//                                     </Col>
//                                 </Form.Group>
//
//                                 <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
//                                     <Form.Label column sm="2">
//                                         Password
//                                     </Form.Label>
//                                     <Col sm="10">
//                                         <Form.Control type={'password'}
//                                                       placeholder="Password"
//                                                       value={password}
//                                                       required
//                                                       onChange={(e) => setPassword(e.target.value)}
//                                         />
//                                     </Col>
//                                 </Form.Group>
//                                 <Button
//                                     variant="success"
//                                     onClick={checkClient}>Авторизоваться</Button>
//                                 <Form.Text><Nav><NavLink onClick={() => setAuthMode(false)}>Зарегистрироваться</NavLink></Nav>,
//                                     если у вас нет аккаунта</Form.Text>
//                             </Form>
//                         </Offcanvas.Body>
//                     </Offcanvas>
//                     :
//                     <Offcanvas show={show} onHide={() => dispatch(changeCanvas(false))} placement={"end"}>
//                         <Offcanvas.Header closeButton>
//                             <Offcanvas.Title>Регистрация</Offcanvas.Title>
//                         </Offcanvas.Header>
//                         <Offcanvas.Body>
//                             <form onSubmit={formik.handleSubmit}>
//                                 <label htmlFor="name">Имя</label>
//                                 <input id={'name'}
//                                        className={'form-control'}
//                                        name={'name'}
//                                        type='text'
//                                        value={formik.values.name}
//                                        onChange={formik.handleChange}
//                                        onBlur={formik.handleBlur}
//                                        required
//                                 />
//                                 <label htmlFor="surname">Фамилия</label>
//                                 <input id={'surname'}
//                                        className={'form-control'}
//                                        name={'surname'}
//                                        value={formik.values.surname}
//                                        onChange={formik.handleChange}
//                                 />
//                                 <label htmlFor="phone">Телефон</label>
//                                 <PatternFormat
//                                     id={'phone'}
//                                     name={'phone'}
//                                     className={classes.phone}
//                                     format={'+# (###) #### ###'}
//                                     allowEmptyFormatting mask={'_'}
//                                     type={'tel'}
//                                     value={formik.values.phone}
//                                     onValueChange={values => {
//                                         formik.setFieldValue('phone', values.value);
//                                     }}
//                                     // onValueChange={(values) => handlePhoneChange(values)}
//                                 />
//
//                                 <label htmlFor="email">Email</label>
//                                 <input id={'email'}
//                                        className={'form-control'}
//                                        name={'email'}
//                                        value={formik.values.email}
//                                        onChange={formik.handleChange}
//                                        type={'email'}
//                                        required
//                                 />
//                                 <label htmlFor="password">Пароль</label>
//                                 <input id={'password'}
//                                        className={'form-control'}
//                                        name={'password'}
//                                        type={'password'}
//                                        placeholder="Password"
//                                        value={formik.values.password}
//                                        onChange={formik.handleChange}
//                                        required
//                                 />
//                                 <label htmlFor="birthday">День рождения</label>
//                                 <div>
//                                     <DatePickerField
//                                         id="birthday"
//                                         type='date'
//                                         name={'birthday'}
//                                         value={formik.values.birthday}
//                                         setFieldValue={formik.setFieldValue}
//                                     />
//                                 </div>
//                             </form>
//                             <button
//                                 type={'submit'}
//                                 variant="success"
//                                 style={{backgroundColor: 'darkgreen'}}
//                                 className={'form-control'}
//                                 onClick={registerClient}
//                             >Зарегистрироваться
//                             </button>
//                             <button
//                                 variant="success"
//                                 className={'form-control'}
//                                 onClick={() => setAuthMode(true)}>Назад
//                             </button>
//                             {
//                                 validationPassword ?
//                                     <>
//                                         <div>Код подтверждения:</div>
//                                         <Form.Control
//                                             value={validationPasswordValue}
//                                             onChange={(event)=>setValidationPasswordValue(event.target.value)}/>
//                                         <Button onClick={checkValidationPassword}>ok</Button>
//                                     </>
//                                     : null
//                             }
//                             {
//                                 repeatRequestPassword ? <div onClick={async ()=>{
//                                     setValidationPassword(true);
//                                     setRepeatRequestPassword(false);
//                                     await registerClient();
//                                 }}>запросить пароль еще раз</div> : null
//                             }
//                         </Offcanvas.Body>
//                     </Offcanvas>
//
//             }
//
//         </>
//     )
// }
// export default Authorization;
