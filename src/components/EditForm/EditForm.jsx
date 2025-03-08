import { RiSaveLine } from 'react-icons/ri';
import { MdOutlineCancel } from 'react-icons/md';

import style from './EditForm.module.css'

const EditForm = ({ defaultValue, updateTodo, cancelUpdate }) => {
  
const handleSubmit = (event) => {
    event.preventDefault();
    const inputValue = event.target.elements.text.value.trim();

     if (!inputValue) return;
     
    updateTodo(inputValue);
    event.target.reset();
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <button className={style.submitButton} type="submit">
        <RiSaveLine color="green" size="16px"/>
      </button>

      <button className={style.editButton} type="button">
        <MdOutlineCancel color="red" size="16px" onClick={cancelUpdate}/>
      </button>

      <input
        className={style.input}
        placeholder="What do you want to write?"
        name="text"
        required
        defaultValue={defaultValue}
        autoFocus
      />
    </form>
  );
};
export default EditForm;
