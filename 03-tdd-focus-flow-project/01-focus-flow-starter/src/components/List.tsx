import { Item } from '../utils'

type Props = {
  items : Item[];
  onDelete: (id: string) => void;
}

const List = ({items, onDelete}: Props) => {
  console.log(items , onDelete )
  return (
    <div>List</div>
  )
}

export default List