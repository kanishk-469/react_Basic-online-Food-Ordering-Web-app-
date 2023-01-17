import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";

// Input Validation helper Function kept outside Component Function
const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;
const isTenChars = value => value.trim().length === 10;

const Checkout = props => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        address: true,
        city: true,
        state: true,
        postalCode: true,
        contact: true
    });

  const nameInputRef = useRef();
  const addressInputRef = useRef();
  const cityInputRef = useRef();
  const stateInputRef = useRef();
  const postalInputRef = useRef();
  const contactInputRef = useRef();



  const confirmHandler = (event) => {
    event.preventDefault();

  const enteredName = nameInputRef.current.value;
  const enteredAddress = addressInputRef.current.value;
  const enteredCity = cityInputRef.current.value;
  const enteredState = stateInputRef.current.value;
  const enteredPostal = postalInputRef.current.value;
  const enteredContact = contactInputRef.current.value;

  const enteredNameIsValid = !isEmpty(enteredName);
  const enteredAddressIsValid = !isEmpty(enteredAddress);
  const enteredCityIsValid = !isEmpty(enteredCity);
  const enteredStateIsValid = !isEmpty(enteredState);
  const enteredPostalIsValid = isFiveChars(enteredPostal);
  const enteredContactIsValid = isTenChars(enteredContact);

  setFormInputsValidity({
      name: enteredNameIsValid,
      address: enteredAddressIsValid,
      city: enteredCityIsValid,
      state: enteredStateIsValid,
      postalCode: enteredPostalIsValid,
      contact: enteredContactIsValid
  });

  const formIsValid = enteredNameIsValid &&
    enteredAddressIsValid &&
    enteredCityIsValid &&
    enteredStateIsValid &&
    enteredPostalIsValid &&
    enteredContactIsValid;

    if(!formIsValid){
    return ;
    }

    /// Submit Data to server or to Backend app, here we pass userData to Cart.js through props
    props.onConfirm({
        name:enteredName,
        address:enteredAddress,
        city:enteredCity,
        state:enteredState,
        postalCode: enteredPostal,
        contact: enteredContact
    });
};

const nameValidityClasses = `${classes.control} ${formInputsValidity.name ? '': classes.invalid}`;
const addressValidityClasses = `${classes.control} ${formInputsValidity.address ? '': classes.invalid}`;
const cityValidityClasses = `${classes.control} ${formInputsValidity.city ? '': classes.invalid}`;
const stateValidityClasses = `${classes.control} ${formInputsValidity.state ? '': classes.invalid}`;
const postalCodeValidityClasses = `${classes.control} ${formInputsValidity.postalCode ? '': classes.invalid}`;
const contactValidityClasses = `${classes.control} ${formInputsValidity.contact ? '': classes.invalid}`;

  return  (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameValidityClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name</p>}
      </div>

      <div className={addressValidityClasses}>
        <label htmlFor="address">Address</label>
        <input type="text" id="address" ref={addressInputRef} />
        {!formInputsValidity.address && <p>Please enter a valid address</p>}
      </div>

      <div className={cityValidityClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city</p>}
      </div>

      <div className={stateValidityClasses}>
        <label htmlFor="state">State</label>
        <input type="text" id="state" ref={stateInputRef} />
        {!formInputsValidity.state && <p>Please enter a valid state</p>}
      </div>

      <div className={postalCodeValidityClasses}>
        <label htmlFor="code">Postal Code</label>
        <input type="text" id="code" ref={postalInputRef} />
        {!formInputsValidity.postalCode && <p>Please enter a valid postal code</p>}
      </div>

      <div className={contactValidityClasses}>
        <label htmlFor="contact">Contact</label>
        <input type="number" id="contact" ref={contactInputRef} />
        {!formInputsValidity.contact && <p>Please enter a valid contact</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
    );
};

export default Checkout;
