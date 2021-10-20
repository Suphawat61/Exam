import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from 'react-native-date-picker'
import AntDesign from "react-native-vector-icons/AntDesign";

export default function AddInput({ submitHandler }) {
  const [value, setValue] = useState("");
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  const onChangeText = (text, value, date) => {
    setValue(text);
    // if(value.length > 0 ){
    //   setValue(submitHandler(value, date));
    // }else{
    //   alert('Please enter the text');
    // }
  };

  return (
    <ComponentContainer>
      <InputContainer>
        <Input
          placeholder=" Add Task... " onChangeText={onChangeText} />
      </InputContainer>
      <CalendarButton onPress={() => setOpen(true)} >
        <AntDesign name="calendar" size={24} color="#80BA9D" />
      </CalendarButton>
      <DatePicker
        modal
        mode="date"
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
      <SubmitButton
        // onPress={() => {
        // onChangeText(value, date);
        // onChangeText(value)
        // setValue(submitHandler(value, date));
        // }}
        onPress={() => {
          if (value.length > 0) {
            setValue(submitHandler(value, date));
          } else {
            alert(' Please enter the text ');
          }
        }}
      >
        <AntDesign name="plus" size={24} color="#80BA9D" />
      </SubmitButton>
    </ComponentContainer>
  );
}

const ComponentContainer = styled.View`
  flex-direction: row;
`;

const InputContainer = styled.View`
  flex-direction: row;
  border-radius: 10px;
`;

const Input = styled.TextInput`
  font-family: Poppins-Regular;
  font-size: 20px;
  background-color: white;
  width: 250px;
  margin-right: 20px;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
`;

const SubmitButton = styled.TouchableOpacity`
  width: 50px;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  margin-bottom: 20px;
  border-radius: 50px;
`;

const CalendarButton = styled.TouchableOpacity`
  width: 50px;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  margin-right: 10px;
  margin-bottom: 20px;
  border-radius: 50px;
`;