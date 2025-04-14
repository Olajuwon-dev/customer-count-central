import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface ReviewModalProps {
  open: boolean;
  onClose: () => void;
  userId: string;
  projectId: string;
}

const emojis = [
  { label: '😠', value: 1 },
  { label: '😐', value: 2 },
  { label: '🙂', value: 3 },
  { label: '😍', value: 4 }
];

const ReviewModal: React.FC<ReviewModalProps> = ({ open, onClose, userId, projectId }) => {
  const { toast } = useToast();
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!rating || !comment.trim()) {
      toast({
        title: 'Incomplete',
        description: 'Please select a rating and enter a comment.',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'reviews'), {
        userId,
        projectId,
        rating,
        comment,
        createdAt: serverTimestamp()
      });

      toast({ title: 'Review submitted', description: 'Thanks for your feedback!' });
      setRating(null);
      setComment('');
      onClose();
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to submit review', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave a Review</DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-center gap-4 my-4">
          {emojis.map(({ label, value }) => (
            <button
              key={value}
              className={`text-3xl transition-transform ${rating === value ? 'scale-125' : 'opacity-50'}`}
              onClick={() => setRating(value)}
            >
              {label}
            </button>
          ))}
        </div>

        <Textarea
          placeholder="Tell us about your experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mb-4"
        />

        <Button onClick={handleSubmit} disabled={loading} className="w-full">
          {loading ? 'Submitting...' : 'Submit Review'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
