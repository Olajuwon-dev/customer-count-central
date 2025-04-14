import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/Usercontext';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from '@/components/ui/card';
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import {
  Users, Globe, BarChart, Search, PieChart, Calendar, User, Settings, History, ThumbsUp, ThumbsDown
} from 'lucide-react';

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useUser();
  const navigate = useNavigate();

  const [statusCounts, setStatusCounts] = useState({
    Active: 0,
    Completed: 0,
    Inactive: 0,
    Submitted: 0
  });

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchStatusCounts = async () => {
      const snapshot = await getDocs(collection(db, 'customers'));
      const counts = { Active: 0, Completed: 0, Inactive: 0, Submitted: 0 };
      snapshot.forEach(doc => {
        const data = doc.data();
        const status = data.currentStatus;
        if (status && counts[status] !== undefined) {
          counts[status]++;
        }
      });
      setStatusCounts(counts);
    };

    const fetchReviews = async () => {
      const snapshot = await getDocs(collection(db, 'reviews'));
      const allReviews = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReviews(allReviews.filter(r => !r.approved));
    };

    fetchStatusCounts();
    fetchReviews();
  }, []);

  const handleReviewApproval = async (reviewId: string, approve: boolean) => {
    await updateDoc(doc(db, 'reviews', reviewId), { approved: approve });
    setReviews(prev => prev.filter(r => r.id !== reviewId));
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" /> Settings
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Globe className="h-5 w-5 text-muted-foreground mr-2" />
              <span className="text-2xl font-bold">{statusCounts.Active}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BarChart className="h-5 w-5 text-muted-foreground mr-2" />
              <span className="text-2xl font-bold">{statusCounts.Completed}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Inactive Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <History className="h-5 w-5 text-muted-foreground mr-2" />
              <span className="text-2xl font-bold">{statusCounts.Inactive}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Submitted Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
              <span className="text-2xl font-bold">{statusCounts.Submitted}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="customers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Pending Reviews</CardTitle>
              <CardDescription>Approve or reject reviews before they go public.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reviews.length === 0 && <p className="text-muted-foreground">No pending reviews</p>}
                {reviews.map((review) => (
                  <div key={review.id} className="border p-4 rounded-md">
                    <p className="text-sm font-medium">{review.username} on {review.projectName}</p>
                    <p className="text-sm text-muted-foreground my-2">{review.message}</p>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" onClick={() => handleReviewApproval(review.id, true)} size="sm">
                        <ThumbsUp className="w-4 h-4 mr-1" /> Approve
                      </Button>
                      <Button variant="destructive" onClick={() => handleReviewApproval(review.id, false)} size="sm">
                        <ThumbsDown className="w-4 h-4 mr-1" /> Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
