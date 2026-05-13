import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

function AdminPanel() {

  const [items, setItems] = useState([]);
  const [newRecord, setNewRecord] = useState({
    item: '',
    class: '',
    description: '',
    containment: '',
    image: ''
  });

  const [editRecord, setEditRecord] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase.from('scp').select('*');

      if (error) {
        console.error(error);
      } else {
        setItems(data);
      }
    };

    fetchItems();
  }, []);

  const addItem = async () => {
    await supabase.from('scp').insert([newRecord]);
    window.location.reload();
  };

  const deleteItem = async (id) => {
    await supabase.from('scp').delete().eq('id', id);
    window.location.reload();
  };

  const startEditing = (item) => {
    setEditRecord(item);
  };

  const saveEdit = async (id) => {
    await supabase.from('scp').update(editRecord).eq('id', id);
    setEditRecord(null);
    window.location.reload();
  };

  return (
    <div>
      <h2>Admin Panel</h2>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {
              editRecord && editRecord.id === item.id ? (
                <>
                  <input value={editRecord.item} onChange={(e) => setEditRecord({ ...editRecord, item: e.target.value })} />
                  <input value={editRecord.class} onChange={(e) => setEditRecord({ ...editRecord, class: e.target.value })} />
                  <input value={editRecord.description} onChange={(e) => setEditRecord({ ...editRecord, description: e.target.value })} />
                  <input value={editRecord.containment} onChange={(e) => setEditRecord({ ...editRecord, containment: e.target.value })} />
                  <button onClick={() => saveEdit(item.id)}>Save</button>
                  <button onClick={() => setEditRecord(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <p>{item.item}</p>
                  <button onClick={() => startEditing(item)}>Edit</button>
                  <button onClick={() => deleteItem(item.id)}>Delete</button>
                </>
              )
            }
          </li>
        ))}
      </ul>

      <h3>Add New Record</h3>
      <input placeholder="Item" onChange={(e) => setNewRecord({ ...newRecord, item: e.target.value })} />
      <input placeholder="Class" onChange={(e) => setNewRecord({ ...newRecord, class: e.target.value })} />
      <input placeholder="Description" onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })} />
      <input placeholder="Containment" onChange={(e) => setNewRecord({ ...newRecord, containment: e.target.value })} />
      <button onClick={addItem}>Add</button>
    </div>
  );
}

export default AdminPanel;