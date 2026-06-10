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
    <div className="admin-panel">
      <h2>Admin Panel</h2>

      <div className="admin-list">
        {items.map((item) => (
          <div className="admin-card" key={item.id}>
            {editRecord && editRecord.id === item.id ? (
              <>
                <input value={editRecord.item} onChange={(e) => setEditRecord({ ...editRecord, item: e.target.value })} />
                <input value={editRecord.class} onChange={(e) => setEditRecord({ ...editRecord, class: e.target.value })} />
                <textarea value={editRecord.description} onChange={(e) => setEditRecord({ ...editRecord, description: e.target.value })} />
                <textarea value={editRecord.containment} onChange={(e) => setEditRecord({ ...editRecord, containment: e.target.value })} />
                <input value={editRecord.image || ''} onChange={(e) => setEditRecord({ ...editRecord, image: e.target.value })} />

                <div className="admin-buttons">
                  <button onClick={() => saveEdit(item.id)}>Save</button>
                  <button onClick={() => setEditRecord(null)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <h3>{item.item}</h3>
                <p><strong>Class:</strong> {item.class}</p>
                <p className="admin-preview">
                {item.description.substring(0, 120)}...
                </p>
                <div className="admin-buttons">
                  <button onClick={() => startEditing(item)}>Edit</button>
                  <button onClick={() => deleteItem(item.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="add-record">
        <h3>Add New Record</h3>

        <input placeholder="Item" onChange={(e) => setNewRecord({ ...newRecord, item: e.target.value })} />
        <input placeholder="Class" onChange={(e) => setNewRecord({ ...newRecord, class: e.target.value })} />
        <textarea placeholder="Description" onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })} />
        <textarea placeholder="Containment" onChange={(e) => setNewRecord({ ...newRecord, containment: e.target.value })} />
        <input placeholder="Image path" onChange={(e) => setNewRecord({ ...newRecord, image: e.target.value })} />

        <button onClick={addItem}>Add Record</button>
      </div>
    </div>
  );
}

export default AdminPanel;