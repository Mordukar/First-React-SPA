import { useCallback, useState, useRef } from "react";
import { Button, TextField} from '@material-ui/core';
import "./form.css";

export const Form = ({ onSubmit }) => {
    const [value, setValue] = useState('');
    const inputRef = useRef(null);

    const handleChange = useCallback((e) => {
        setValue(e.target.value);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(value);
        setValue('');
        inputRef.current.focus();
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
          <div>Введите сообщение:</div>
          <TextField
            color="primary"
            placeholder="message"
            label="Label"
            value={value}
            onChange={handleChange}
            inputRef={inputRef}
          />
          <Button variant="outlined" className="button" type="submit">Submit</Button>
      </form>
    );
}

