// ✅ Public Reviews Page using animations and only approved reviews

import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ThumbsUp } from 'lucide-react';

interface Review {
  id: string;
  emoji: string;
  message: string;
  projectName: string;
  username: string;
  approved: boolean;
}

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchApprovedReviews = async () => {
      const snapshot = await getDocs(collection(db, 'reviews'));
      const all = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Review));
      setReviews(all.filter(r => r.approved));
    };

    fetchApprovedReviews();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <p className="text-gray-500 text-center">No reviews yet. Be the first to leave feedback after your project is done!</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review, i) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            <Card className="shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">{review.projectName}</CardTitle>
                  <Badge variant="outline">{review.emoji}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 italic">"{review.message}"</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">— {review.username}</span>
                  <ThumbsUp className="h-4 w-4 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
