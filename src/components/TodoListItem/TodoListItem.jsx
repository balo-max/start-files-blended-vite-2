import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';
import style from './TodoListItem.module.css'

import Text from '../Text/Text'

const TodoListItem = ({todo, onDelete, index, onEdit}) => {
  return (
      <div className={style.box}>
        <Text textAlign="center" marginBottom="20">
          TODO #{index}
        </Text>
        <Text>{todo.text}</Text>
        <button className={style.deleteButton} type="button">
          <RiDeleteBinLine size={24} onClick={() => onDelete(todo.id)} />
        </button>

      <button className={style.editButton} type="button" onClick={() => onEdit(todo)}>
          <RiEdit2Line size={24} />
        </button>
      </div>
  );
};

export default TodoListItem;
