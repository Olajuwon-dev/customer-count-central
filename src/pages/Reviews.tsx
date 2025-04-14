// src/pages/Reviews.tsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface Review {
  id: string;
  username: string;
  projectName: string;
  message: string;
  emoji: string;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchApprovedReviews = async () => {
      const q = query(collection(db, 'reviews'), where('approved', '==', true));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Review));
      setReviews(data);
    };

    fetchApprovedReviews();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">User Reviews</h1>
      {reviews.length === 0 ? (
        <p className="text-center text-muted-foreground">No reviews yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">{review.projectName}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-xl">{review.emoji}</div>
                  <p className="text-sm text-muted-foreground">{review.message}</p>
                  <p className="text-sm font-medium text-right">– {review.username}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
