import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabase';

function ItemDetail() {

  const { id } = useParams();
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      const { data, error } = await supabase
        .from('scp')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error(error);
      } else {
        setItemData(data);
      }
    };

    fetchItemDetails();
  }, [id]);

  return (
    <div>
      {
        itemData ? (
          <>
            <h1>{itemData.item}</h1>
            <h2>{itemData.class}</h2>
            <h3>Description</h3>
            <p>{itemData.description}</p>
            <h3>Containment</h3>
            <p>{itemData.containment}</p>
          </>
        ) : (
          <p>Loading...</p>
        )
      }
    </div>
  );
}

export default ItemDetail;