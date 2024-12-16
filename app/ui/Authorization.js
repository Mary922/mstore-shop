import React, {useState} from "react";

import {Auth} from "@/app/lib/api/auth";
import DatePicker from "react-datepicker";

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


const Authorization = () => {
    const [authMode, setAuthMode] = useState(true);

    //
    // const [changeBirthdayDate, setChangeBirthdayDate] = useState(new Date());
    //

    // const [validationPassword, setValidationPassword] = useState(false);
    // const [validationPasswordValue, setValidationPasswordValue] = useState('');
    // const [repeatRequestPassword, setRepeatRequestPassword] = useState(false);
    //
    //

    //
    // const show = useSelector((state) => state.common.canvasOnShow);
    //
    // const classes = {
    //     address: clsx({'form-text': true},
    //         {'is-invalid': errorForm.address},
    //     ),
    //     region: clsx({'form-select': true},
    //         {'is-invalid': errorForm.region},
    //     ),
    //     city: clsx({'form-select': true},
    //         {'is-invalid': errorForm.city},
    //     ),
    //     phone: clsx({'form-control': true},
    //         {'is-invalid': errorForm.phone},
    //     )
    // };
    //
    //
    // const checkClient = async () => {
    //     if (clientId || tempClient) {
    //         const result = await Auth({email: email, password: password});
    //         // console.log('TOKEN RESPONSE', result);
    //
    //         if (result.data?.accessToken) {
    //             localStorage.setItem('client', JSON.stringify(result.data));
    //             localStorage.removeItem('temp-client');
    //             window.location.replace('/home');
    //         }
    //     }
    //
    //         // if (tempClient) {
    //         //     console.log('i dont know who you are')
    //     // }
    //     else {
    //         alert('No token')
    //     }
    // }
    //

    //
    // const handlePhoneChange = (values) => {
    //     setPhone(7 + values.value);
    // }
    //


    //
    // const checkValidationPassword = async () => {
    //     try {
    //         const result = await CheckValidationPassword({
    //             email: formik.values.email,
    //             generatedPassword: validationPasswordValue,
    //             name: formik.values.name,
    //             surname: formik.values.surname,
    //             phone: formik.values.phone,
    //             password: formik.values.password,
    //             birthday: formik.values.birthday,
    //             tempClientToken: tempClient,
    //         })
    //         if (result.success === true) {
    //             setValidationPassword(false);
    //             console.log('вы зарегистрированы');
    //
    //             const authMode = await Auth({email: formik.values.email, password: formik.values.password});
    //
    //             if (authMode.success) {
    //                 setValidationPassword(true);
    //             }
    //             if (authMode.success) {
    //                 localStorage.removeItem('temp-client');
    //                 localStorage.setItem('client', JSON.stringify(authMode.data));
    //                 // window.location.reload();
    //                 // navigate('/home');
    //             }
    //             await dispatch(changeCanvas(false));
    //         } else if (result.success === false && result.status === 403) {
    //             console.log('Неправильный пароль');
    //             setValidationPassword(false);
    //             setValidationPasswordValue('');
    //             setRepeatRequestPassword(true);
    //         }
    //     } catch (error) {
    //         // console.log('Неправильный пароль');
    //         console.log(error);
    //     }
    // }


    return (
        <>
            {/*{*/}
            {/*    authMode ?*/}
            {/*        <Offcanvas show={show} onHide={() => dispatch(changeCanvas(false))} placement={"end"}>*/}
            {/*            <Offcanvas.Header closeButton>*/}
            {/*                <Offcanvas.Title>Вход</Offcanvas.Title>*/}
            {/*            </Offcanvas.Header>*/}
            {/*            <Offcanvas.Body>*/}
            {/*                <Form>*/}
            {/*                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">*/}
            {/*                        <Form.Label column sm="2">*/}
            {/*                            Email*/}
            {/*                        </Form.Label>*/}
            {/*                        <Col sm="10">*/}
            {/*                            <Form.Control value={email}*/}
            {/*                                          type={'email'}*/}
            {/*                                          required*/}
            {/*                                          onChange={(e) => setEmail(e.target.value)}*/}
            {/*                            />*/}
            {/*                        </Col>*/}
            {/*                    </Form.Group>*/}

            {/*                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">*/}
            {/*                        <Form.Label column sm="2">*/}
            {/*                            Password*/}
            {/*                        </Form.Label>*/}
            {/*                        <Col sm="10">*/}
            {/*                            <Form.Control type={'password'}*/}
            {/*                                          placeholder="Password"*/}
            {/*                                          value={password}*/}
            {/*                                          required*/}
            {/*                                          onChange={(e) => setPassword(e.target.value)}*/}
            {/*                            />*/}
            {/*                        </Col>*/}
            {/*                    </Form.Group>*/}
            {/*                    <Button*/}
            {/*                        variant="success"*/}
            {/*                        onClick={checkClient}>Авторизоваться</Button>*/}
            {/*                    <Form.Text><Nav><NavLink onClick={() => setAuthMode(false)}>Зарегистрироваться</NavLink></Nav>,*/}
            {/*                        если у вас нет аккаунта</Form.Text>*/}
            {/*                </Form>*/}
            {/*            </Offcanvas.Body>*/}
            {/*        </Offcanvas>*/}
            {/*        :*/}
            {/*        <Offcanvas show={show} onHide={() => dispatch(changeCanvas(false))} placement={"end"}>*/}
            {/*            <Offcanvas.Header closeButton>*/}
            {/*                <Offcanvas.Title>Регистрация</Offcanvas.Title>*/}
            {/*            </Offcanvas.Header>*/}
            {/*            <Offcanvas.Body>*/}
            {/*                <form onSubmit={formik.handleSubmit}>*/}
            {/*                    <label htmlFor="name">Имя</label>*/}
            {/*                    <input id={'name'}*/}
            {/*                           className={'form-control'}*/}
            {/*                           name={'name'}*/}
            {/*                           type='text'*/}
            {/*                           value={formik.values.name}*/}
            {/*                           onChange={formik.handleChange}*/}
            {/*                           onBlur={formik.handleBlur}*/}
            {/*                           required*/}
            {/*                    />*/}
            {/*                    <label htmlFor="surname">Фамилия</label>*/}
            {/*                    <input id={'surname'}*/}
            {/*                           className={'form-control'}*/}
            {/*                           name={'surname'}*/}
            {/*                           value={formik.values.surname}*/}
            {/*                           onChange={formik.handleChange}*/}
            {/*                    />*/}
            {/*                    <label htmlFor="phone">Телефон</label>*/}
            {/*                    <PatternFormat*/}
            {/*                        id={'phone'}*/}
            {/*                        name={'phone'}*/}
            {/*                        className={classes.phone}*/}
            {/*                        format={'+# (###) #### ###'}*/}
            {/*                        allowEmptyFormatting mask={'_'}*/}
            {/*                        type={'tel'}*/}
            {/*                        value={formik.values.phone}*/}
            {/*                        onValueChange={values => {*/}
            {/*                            formik.setFieldValue('phone', values.value);*/}
            {/*                        }}*/}
            {/*                        // onValueChange={(values) => handlePhoneChange(values)}*/}
            {/*                    />*/}

            {/*                    <label htmlFor="email">Email</label>*/}
            {/*                    <input id={'email'}*/}
            {/*                           className={'form-control'}*/}
            {/*                           name={'email'}*/}
            {/*                           value={formik.values.email}*/}
            {/*                           onChange={formik.handleChange}*/}
            {/*                           type={'email'}*/}
            {/*                           required*/}
            {/*                    />*/}
            {/*                    <label htmlFor="password">Пароль</label>*/}
            {/*                    <input id={'password'}*/}
            {/*                           className={'form-control'}*/}
            {/*                           name={'password'}*/}
            {/*                           type={'password'}*/}
            {/*                           placeholder="Password"*/}
            {/*                           value={formik.values.password}*/}
            {/*                           onChange={formik.handleChange}*/}
            {/*                           required*/}
            {/*                    />*/}
            {/*                    <label htmlFor="birthday">День рождения</label>*/}
            {/*                    <div>*/}
            {/*                        <DatePickerField*/}
            {/*                            id="birthday"*/}
            {/*                            type='date'*/}
            {/*                            name={'birthday'}*/}
            {/*                            value={formik.values.birthday}*/}
            {/*                            setFieldValue={formik.setFieldValue}*/}
            {/*                        />*/}
            {/*                    </div>*/}
            {/*                </form>*/}
            {/*                <button*/}
            {/*                    type={'submit'}*/}
            {/*                    variant="success"*/}
            {/*                    style={{backgroundColor: 'darkgreen'}}*/}
            {/*                    className={'form-control'}*/}
            {/*                    onClick={registerClient}*/}
            {/*                >Зарегистрироваться*/}
            {/*                </button>*/}
            {/*                <button*/}
            {/*                    variant="success"*/}
            {/*                    className={'form-control'}*/}
            {/*                    onClick={() => setAuthMode(true)}>Назад*/}
            {/*                </button>*/}
            {/*                {*/}
            {/*                    validationPassword ?*/}
            {/*                        <>*/}
            {/*                            <div>Код подтверждения:</div>*/}
            {/*                            <Form.Control*/}
            {/*                                value={validationPasswordValue}*/}
            {/*                                onChange={(event)=>setValidationPasswordValue(event.target.value)}/>*/}
            {/*                            <Button onClick={checkValidationPassword}>ok</Button>*/}
            {/*                        </>*/}
            {/*                        : null*/}
            {/*                }*/}
            {/*                {*/}
            {/*                    repeatRequestPassword ? <div onClick={async ()=>{*/}
            {/*                        setValidationPassword(true);*/}
            {/*                        setRepeatRequestPassword(false);*/}
            {/*                        await registerClient();*/}
            {/*                    }}>запросить пароль еще раз</div> : null*/}
            {/*                }*/}
            {/*            </Offcanvas.Body>*/}
            {/*        </Offcanvas>*/}

            {/*}*/}

        </>
    )
}
// export default Authorization;
//
//
// export const DatePickerField = ({name, value, setFieldValue}) => {
//
//     return (
//         <DatePicker
//             className={'form-control'}
//             name={name}
//             selected={(value && new Date(value)) || null}
//             onChange={(val) => {
//                 setFieldValue(name, moment(val).format('YYYY-MM-DD'));
//             }}
//             showMonthYearDropdown/>
//     );
// };

