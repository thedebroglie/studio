import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Share2, Award } from 'lucide-react';

// Mock data for student certificates
const certificates = [
  {
    id: '1',
    title: 'Bachelor of Science in Computer Science',
    institution: 'Metropolis University',
    issueDate: 'May 20, 2023',
    credentialId: '0x123...abc',
  },
  {
    id: '2',
    title: 'Advanced React Development',
    institution: 'Online Code Academy',
    issueDate: 'January 15, 2024',
    credentialId: '0x456...def',
  },
  {
    id: '3',
    title: 'AI and Machine Learning Fundamentals',
    institution: 'Tech Institute',
    issueDate: 'March 01, 2024',
    credentialId: '0x789...ghi',
  },
];

export default function StudentWalletPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 font-headline">
        My Certificate Wallet
      </h1>
      <p className="text-muted-foreground mb-8">
        Here are your securely stored and verified credentials. Share them with
        pride.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <Card key={cert.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle>{cert.title}</CardTitle>
                <Award className="h-8 w-8 text-primary shrink-0 ml-4" />
              </div>
              <CardDescription>{cert.institution}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">
                Issued on: {cert.issueDate}
              </p>
              <p className="text-sm text-muted-foreground truncate">
                ID: {cert.credentialId}
              </p>
            </CardContent>
            <CardFooter className="gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
