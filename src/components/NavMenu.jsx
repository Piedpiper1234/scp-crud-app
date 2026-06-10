import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase';

function NavMenu() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from('scp')
        .select('*')
        .order('item', { ascending: true });

      if (error) {
        console.error(error);
      } else {
        setItems(data);
      }
    };

    fetchItems();
  }, []);

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        {items.map((item) => (
          <li key={item.id}>
            <Link to={`/item/${item.id}`}>
              {item.item}
            </Link>
          </li>
        ))}

        <li>
          <Link to="/admin">
            Admin Panel
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavMenu;