import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Clock, FileText, User } from 'lucide-react';
import ReviewModal from '@/components/ReviewModal';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      const docRef = doc(db, 'customers', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProject({ id: docSnap.id, ...data });
        if (data.currentStatus === 'Submitted') {
          setShowReviewModal(true);
        }
      }
    };
    if (id) fetchProject();
  }, [id]);

  if (!project) return <div className="p-4">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{project.projectName}</CardTitle>
          <CardDescription>Status: {project.currentStatus}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            <User className="inline h-4 w-4 mr-1" /> {project.createdByName}
          </div>
          <div className="text-sm text-muted-foreground">
            <FileText className="inline h-4 w-4 mr-1" /> {project.notes || 'No additional notes'}
          </div>

          <div>
            <h4 className="font-semibold mb-1">Progress</h4>
            <Progress value={project.progress || 0} />
          </div>

          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-1">
              <Clock className="h-4 w-4" /> Phase History
            </h4>
            <ul className="text-sm space-y-1">
              {(project.phaseHistory || []).map((item, index) => (
                <li key={index}>
                  <span className="text-muted-foreground">{item.date}</span> - {item.status}
                </li>
              ))}
            </ul>
          </div>

          <a
            href={`https://wa.me/${project.phone || ''}?text=Hello%20B.david,%20I%20have%20a%20question%20about%20my%20project%20(${project.projectName})`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-sm font-medium text-white bg-green-600 px-4 py-2 rounded hover:bg-green-700"
          >
            Chat on WhatsApp
          </a>
        </CardContent>
      </Card>

      {showReviewModal && (
        <ReviewModal
          projectId={project.id}
          projectName={project.projectName}
          userId={project.createdBy}
          userName={project.createdByName}
          onClose={() => setShowReviewModal(false)}
        />
      )}
    </div>
  );
};

export default ProjectDetail;