import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase';

function NavMenu() {

  const [item, setItem] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from('scp')
        .select('id, item');

      if (error) {
        console.error(error);
      } else {
        setItem(data);
      }
    };

    fetchItems();
  }, []);

  return (
    <nav>
      <ul>
        {item.map((items) => (
          <li key={items.id}>
            <Link to={`/item/${items.id}`}>{items.item}</Link>
          </li>
        ))}
        <li>
          <Link to="/admin">Admin Panel</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavMenu;