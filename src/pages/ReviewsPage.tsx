import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const q = query(collection(db, 'reviews'), where("approved", "==", true));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReviews(data);
    };

    fetchReviews();
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">What Our Users Say</h1>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((r: any) => (
            <div key={r.id} className="border p-4 rounded-md shadow-sm">
              <div className="flex justify-between">
                <h3 className="font-semibold">{r.userName}</h3>
                <span className="text-yellow-500">⭐ {r.rating}</span>
              </div>
              <p className="mt-2">{r.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;
