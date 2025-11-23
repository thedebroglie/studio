import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon, Award, ShieldCheck } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function CertificateSearchPage() {
  // Mock search result
  const searchResult = {
    id: '1',
    title: 'Bachelor of Science in Computer Science',
    student: 'Jane Doe',
    institution: 'Metropolis University',
    issueDate: 'May 20, 2023',
    status: 'Verified',
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 font-headline">
        Certificate Search
      </h1>
      <p className="text-muted-foreground mb-8">
        Look up any credential issued on the Cred-Pass network using its unique
        ID.
      </p>

      <div className="flex w-full max-w-lg items-center space-x-2 mb-12">
        <Input type="text" placeholder="Enter Certificate ID..." />
        <Button type="submit">
          <SearchIcon className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>

      {/* Mocked search result display */}
      <h2 className="text-xl font-semibold mb-4">Search Result</h2>
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>{searchResult.title}</CardTitle>
              <CardDescription>
                Issued to: {searchResult.student}
              </CardDescription>
            </div>
            <Award className="h-8 w-8 text-primary shrink-0 ml-4" />
          </div>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Institution:</strong> {searchResult.institution}
          </p>
          <p>
            <strong>Issue Date:</strong> {searchResult.issueDate}
          </p>
          <div className="flex items-center gap-2 mt-4 text-primary font-medium">
            <ShieldCheck className="h-5 w-5" />
            <span>{searchResult.status} on Blockchain</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
