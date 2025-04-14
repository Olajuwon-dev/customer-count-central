import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const SubmitReview = () => {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState('');
  const { toast } = useToast();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message || !rating) {
      toast({
        title: "All fields required",
        description: "Please fill out all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      await addDoc(collection(db, 'reviews'), {
        userId: user.uid,
        userName: user.name || "Anonymous",
        message,
        rating: parseInt(rating),
        approved: false,
        createdAt: serverTimestamp(),
      });

      toast({
        title: "Review submitted",
        description: "Thanks! Your review is pending approval.",
      });

      setMessage('');
      setRating('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-8 max-w-md">
      <h3 className="text-lg font-semibold">Leave a Review</h3>
      <Input
        type="number"
        placeholder="Rating (1 to 5)"
        value={rating}
        min={1}
        max={5}
        onChange={(e) => setRating(e.target.value)}
      />
      <Textarea
        placeholder="Your feedback..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button type="submit">Submit Review</Button>
    </form>
  );
};

export default SubmitReview;
